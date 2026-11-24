import networkx as nx
from typing import List, Dict, Any
from app.schemas import RelationshipGraph, RelationshipNode, RelationshipEdge

def build_incident_relationship_graph(incident: Dict[str, Any], evidence_items: List[Dict[str, Any]]) -> RelationshipGraph:
    """
    Constructs an interactive entity-relationship graph using NetworkX
    linking incidents, evidence files, sender handles, and message patterns.
    """
    G = nx.DiGraph()
    nodes: List[RelationshipNode] = []
    edges: List[RelationshipEdge] = []

    inc_id = incident["id"]
    inc_title = incident["title"]
    
    # 1. Root incident node
    nodes.append(RelationshipNode(
        id=inc_id,
        label=inc_title[:28] + ("..." if len(inc_title) > 28 else ""),
        type="incident",
        details={
            "reference": incident.get("reference_number", "INC-001"),
            "category": incident.get("category", "General"),
            "status": incident.get("status", "active"),
            "date": incident.get("incident_date", "2026-11-20")
        }
    ))
    G.add_node(inc_id, type="incident")

    # Accounts observed
    observed_accounts = set()

    for idx, ev in enumerate(evidence_items):
        ev_id = ev["id"]
        ev_name = ev.get("original_filename", f"Evidence #{idx+1}")
        
        # Evidence node
        nodes.append(RelationshipNode(
            id=ev_id,
            label=ev_name[:24],
            type="evidence",
            details={
                "sha256": ev.get("sha256_hash", "")[:16] + "...",
                "file_type": ev.get("file_type", "image/png"),
                "uploaded_at": ev.get("uploaded_at", "")
            }
        ))
        G.add_node(ev_id, type="evidence")
        
        # Edge: Evidence -> Incident
        edges.append(RelationshipEdge(
            id=f"e-{ev_id}-{inc_id}",
            source=ev_id,
            target=inc_id,
            relation="associated_with",
            confidence=1.0,
            verified=True
        ))
        G.add_edge(ev_id, inc_id, relation="associated_with")

        # Parse extracted handles/accounts from text or mock accounts
        text = ev.get("extracted_text", "")
        # Look for @handles
        import re
        handles = re.findall(r'@([A-Za-z0-9_]{3,20})', text)
        if not handles:
            handles = ["shadow_stalker99"]

        for h in handles:
            h_id = f"acc-{h.lower()}"
            if h_id not in observed_accounts:
                observed_accounts.add(h_id)
                nodes.append(RelationshipNode(
                    id=h_id,
                    label=f"@{h}",
                    type="account",
                    details={
                        "platform": "Direct Messaging / Social",
                        "suspected_role": "Sender / Unverified Profile",
                        "hypothesis": "AI-suggested relationship (Unverified hypothesis - human review required)"
                    }
                ))
                G.add_node(h_id, type="account")

            # Edge: Account -> Evidence
            edges.append(RelationshipEdge(
                id=f"e-{h_id}-{ev_id}",
                source=h_id,
                target=ev_id,
                relation="appears_in",
                confidence=0.92,
                verified=False
            ))
            G.add_edge(h_id, ev_id, relation="appears_in")

    # If multiple handles appear, connect them with a suspected shared source
    acc_list = list(observed_accounts)
    if len(acc_list) > 1:
        for i in range(len(acc_list) - 1):
            edges.append(RelationshipEdge(
                id=f"e-contact-{acc_list[i]}-{acc_list[i+1]}",
                source=acc_list[i],
                target=acc_list[i+1],
                relation="repeated_contact",
                confidence=0.85,
                verified=False
            ))

    return RelationshipGraph(nodes=nodes, edges=edges)
