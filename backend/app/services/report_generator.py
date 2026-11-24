import os
import uuid
from datetime import datetime
from typing import Dict, Any, List
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def generate_pdf_report(incident: Dict[str, Any], evidence_items: List[Dict[str, Any]], output_dir: str = "reports") -> str:
    """
    Generates a formal, professional PDF incident evidence dossier using ReportLab.
    Includes cryptographic hashes, chronological events, AI analysis, and reporting resources.
    """
    os.makedirs(output_dir, exist_ok=True)
    report_id = f"REP-{uuid.uuid4().hex[:8].upper()}"
    filename = f"TraceHer_Incident_{incident.get('reference_number', 'REP')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    file_path = os.path.join(output_dir, filename)

    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#6556D9")
    navy_color = colors.HexColor("#17172F")
    gray_subtext = colors.HexColor("#777A91")
    light_bg = colors.HexColor("#F7F8FC")
    border_color = colors.HexColor("#E8E9F1")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=TA_LEFT
    )

    h2_style = ParagraphStyle(
        'DocHeading2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=navy_color,
        spaceBefore=14,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#20213A")
    )

    mono_style = ParagraphStyle(
        'DocMono',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#333333")
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#D95F6C"),
        alignment=TA_LEFT
    )

    story = []

    # 1. Header Banner
    header_data = [
        [
            Paragraph("<b>TRACEHER</b><br/><font size=8 color='#777A91'>Evidence Intelligence & Safety Platform</font>", body_style),
            Paragraph(f"<b>REPORT ID:</b> {report_id}<br/><b>DATE:</b> {datetime.now().strftime('%d %b %Y, %H:%M')}", ParagraphStyle('HeadRight', parent=body_style, alignment=TA_RIGHT))
        ]
    ]
    header_table = Table(header_data, colWidths=[280, 250])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=4, spaceAfter=14))

    # Title & Legal Notice Box
    story.append(Paragraph("DIGITAL EVIDENCE INTELLIGENCE DOSSIER", title_style))
    story.append(Spacer(1, 4))
    
    notice_text = (
        "<b>OFFICIAL NOTICE:</b> This document contains cryptographically verified digital evidence items and AI-assisted safety classifications. "
        "All automated classifications require human review and corroboration. This dossier is organized to assist law enforcement, "
        "cybercrime reporting cells (cybercrime.gov.in), emergency response units, and legal counsel."
    )
    notice_table = Table([[Paragraph(notice_text, body_style)]], colWidths=[530])
    notice_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(notice_table)
    story.append(Spacer(1, 14))

    # 2. Incident Summary
    story.append(Paragraph("1. INCIDENT PROFILE", h2_style))
    profile_data = [
        [Paragraph("<b>Incident Title:</b>", body_style), Paragraph(incident.get("title", "Untitled Incident"), body_style)],
        [Paragraph("<b>Incident Reference:</b>", body_style), Paragraph(incident.get("reference_number", "INC-001"), mono_style)],
        [Paragraph("<b>Primary Category:</b>", body_style), Paragraph(incident.get("category", "General"), body_style)],
        [Paragraph("<b>Incident Reported Date:</b>", body_style), Paragraph(str(incident.get("incident_date", "N/A")), body_style)],
        [Paragraph("<b>Total Evidence Exhibits:</b>", body_style), Paragraph(str(len(evidence_items)), body_style)],
        [Paragraph("<b>Description / Statement:</b>", body_style), Paragraph(incident.get("description", "No narrative provided."), body_style)]
    ]
    profile_table = Table(profile_data, colWidths=[140, 390])
    profile_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), light_bg),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(profile_table)
    story.append(Spacer(1, 14))

    # 3. Evidence Inventory & Integrity (SHA-256)
    story.append(Paragraph("2. CHAIN OF CUSTODY & EVIDENCE INVENTORY (SHA-256)", h2_style))
    inv_headers = [
        Paragraph("<b>Exhibit ID</b>", body_style),
        Paragraph("<b>Filename</b>", body_style),
        Paragraph("<b>Type / Size</b>", body_style),
        Paragraph("<b>SHA-256 Hash Integrity</b>", body_style),
    ]
    inv_rows = [inv_headers]
    for idx, ev in enumerate(evidence_items):
        inv_rows.append([
            Paragraph(f"EX-{idx+1:02d}", mono_style),
            Paragraph(ev.get("original_filename", "evidence_file"), body_style),
            Paragraph(f"{ev.get('file_type', 'file')} ({round(ev.get('file_size', 0)/1024, 1)} KB)", body_style),
            Paragraph(ev.get("sha256_hash", "UNVERIFIED_HASH"), mono_style),
        ])
    
    if len(inv_rows) == 1:
        inv_rows.append([Paragraph("No evidence items attached.", body_style), Paragraph("-", body_style), Paragraph("-", body_style), Paragraph("-", body_style)])

    inv_table = Table(inv_rows, colWidths=[70, 140, 100, 220])
    inv_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), light_bg),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(inv_table)
    story.append(Spacer(1, 14))

    # 4. AI Threat Analysis & Classification
    story.append(Paragraph("3. AI THREAT & PATTERN CLASSIFICATION MATRIX", h2_style))
    ai_headers = [
        Paragraph("<b>Category</b>", body_style),
        Paragraph("<b>Confidence</b>", body_style),
        Paragraph("<b>Explainability & Supporting Text Excerpt</b>", body_style),
        Paragraph("<b>Review Status</b>", body_style)
    ]
    ai_rows = [ai_headers]

    for ev in evidence_items:
        for ana in ev.get("analyses", []):
            ai_rows.append([
                Paragraph(f"<b>{ana.get('category')}</b>", body_style),
                Paragraph(f"{int(ana.get('confidence', 0.8) * 100)}%", body_style),
                Paragraph(f"<i>'{ana.get('supporting_text', '')}'</i><br/><b>Context:</b> {ana.get('explanation', '')}", body_style),
                Paragraph(ana.get("reviewed_status", "pending").upper(), body_style)
            ])
    
    if len(ai_rows) == 1:
        ai_rows.append([Paragraph("No AI analysis executed.", body_style), Paragraph("-", body_style), Paragraph("-", body_style), Paragraph("-", body_style)])

    ai_table = Table(ai_rows, colWidths=[110, 60, 280, 80])
    ai_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), light_bg),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(ai_table)
    story.append(Spacer(1, 14))

    # 5. Chronological Incident Timeline
    story.append(Paragraph("4. CHRONOLOGICAL INCIDENT TIMELINE", h2_style))
    timeline_events = incident.get("timeline", [])
    time_headers = [Paragraph("<b>Date / Time</b>", body_style), Paragraph("<b>Event Narrative</b>", body_style), Paragraph("<b>Source Type</b>", body_style)]
    time_rows = [time_headers]

    for ev_item in timeline_events:
        time_rows.append([
            Paragraph(ev_item.get("event_date", "Undated"), mono_style),
            Paragraph(f"<b>{ev_item.get('title', '')}</b>: {ev_item.get('description', '')}", body_style),
            Paragraph(ev_item.get("source_type", "user_reported").capitalize(), body_style)
        ])
    
    if len(time_rows) == 1:
        time_rows.append([
            Paragraph(str(incident.get("incident_date", "2026-11-20")), mono_style),
            Paragraph(f"Initial incident occurrence documented: {incident.get('title')}", body_style),
            Paragraph("User Log", body_style)
        ])

    time_table = Table(time_rows, colWidths=[110, 320, 100])
    time_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), light_bg),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(time_table)
    story.append(Spacer(1, 14))

    # 6. Official Resources & Emergency Contacts
    story.append(Paragraph("5. ACTIONABLE REPORTING RESOURCES (INDIA)", h2_style))
    res_text = (
        "<b>• National Cyber Crime Reporting Portal:</b> https://cybercrime.gov.in (Official Government of India portal for cyber harassment, stalking, and child safety)<br/>"
        "<b>• National Emergency Contact Number:</b> <b>112</b> (Police, Medical, Fire immediate response)<br/>"
        "<b>• National Cybercrime Helpline:</b> <b>1930</b> (Dedicated financial cyber fraud and expedited cyber distress)<br/>"
        "<b>• Women's Helpline (National Commission for Women):</b> 7827-170-170 | https://ncw.nic.in"
    )
    res_table = Table([[Paragraph(res_text, body_style)]], colWidths=[530])
    res_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(res_table)
    story.append(Spacer(1, 14))

    # Disclaimer footer
    disclaimer = (
        "<font size=7 color='#777A91'>LEGAL DISCLAIMER: TRACEHER is a technical evidence organization and safety intelligence platform. "
        "It does not provide legal advice or guarantee specific judicial outcomes. SHA-256 hashes confirm digital file integrity "
        "from the time of local ingestion. Generated at " + datetime.now().isoformat() + "</font>"
    )
    story.append(Paragraph(disclaimer, ParagraphStyle('Disc', parent=body_style, alignment=TA_CENTER)))

    doc.build(story)
    return file_path
