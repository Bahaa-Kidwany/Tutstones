const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType, AlignmentType } = require('docx');

async function createDesignDoc() {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title Header
        new Paragraph({
          text: "TUT STONES",
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Official Brand & Design Specification Guide (Pharaonic Theme)",
              bold: true,
              size: 28,
              color: "8D4F4E"
            })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Egyptian Marble & Granite Export Web Application | Pharaonic Visual Identity",
              italic: true,
              size: 20,
              color: "567394"
            })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 }
        }),

        // 1. Executive Summary & Brand Philosophy
        new Paragraph({
          text: "1. Brand Identity & Design Philosophy",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "TUT Stones combines Egypt's 5,000-year geological heritage with modern luxury architectural design. The visual language is defined by rich stone textures, high-contrast Pharaonic color pigments (Terracotta Red, Nile Lapis Blue, Egyptian Gold), and classical typography."
            })
          ],
          spacing: { after: 200 }
        }),

        // 2. Pharaonic Color Palette
        new Paragraph({
          text: "2. Official Color Palette — Pharaonic Heritage Theme",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Directly derived from ancient Egyptian temple frescoes, lapis lazuli, red ochre, and papyrus sandstone.",
              italic: true
            })
          ],
          spacing: { before: 50, after: 150 }
        }),

        // Table for Pharaonic Theme Only
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Token Name", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Hex Code", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "RGB Value", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Usage & Application", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Egyptian Terracotta Red")] }),
                new TableCell({ children: [new Paragraph("#8D4F4E")] }),
                new TableCell({ children: [new Paragraph("rgb(141, 79, 78)")] }),
                new TableCell({ children: [new Paragraph("Section tags, primary CTAs, active buttons, card borders")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Nile Lapis Blue")] }),
                new TableCell({ children: [new Paragraph("#567394")] }),
                new TableCell({ children: [new Paragraph("rgb(86, 115, 148)")] }),
                new TableCell({ children: [new Paragraph("Subheaders, experience badges, secondary feature icons")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Egyptian Sun Gold")] }),
                new TableCell({ children: [new Paragraph("#DFB77D")] }),
                new TableCell({ children: [new Paragraph("rgb(223, 183, 125)")] }),
                new TableCell({ children: [new Paragraph("Header bottom border, active indicators, highlights")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Papyrus Base")] }),
                new TableCell({ children: [new Paragraph("#F5E9D8")] }),
                new TableCell({ children: [new Paragraph("rgb(245, 233, 216)")] }),
                new TableCell({ children: [new Paragraph("Light papyrus background base")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Hieroglyph Charcoal")] }),
                new TableCell({ children: [new Paragraph("#241C18")] }),
                new TableCell({ children: [new Paragraph("rgb(36, 28, 24)")] }),
                new TableCell({ children: [new Paragraph("Primary readable body text & section titles")] })
              ]
            })
          ]
        }),

        // 3. Typography Standards
        new Paragraph({
          text: "3. Typography Hierarchy & Font System",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Heading Font: ", bold: true }),
            new TextRun("Cormorant Garamond (Weights: 400, 500, 600, 700; Fallbacks: Georgia, serif)")
          ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Pharaonic Accent Font: ", bold: true }),
            new TextRun("Cinzel / Cinzel Decorative (Weights: 600, 700, 800)")
          ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Body Copy Font: ", bold: true }),
            new TextRun("Plus Jakarta Sans (Weights: 300, 400, 500, 600, 700; Fallbacks: system-ui, sans-serif)")
          ],
          spacing: { after: 200 }
        }),

        // 4. Design Assets Directory Index
        new Paragraph({
          text: "4. Complete Design Assets Catalog (design_assets/)",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 120 }
        }),
        new Paragraph({
          text: "All high-resolution image files inside design_assets/ folder:",
          spacing: { after: 120 }
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Filename", bold: true, color: "FFFFFF" })] })], shading: { fill: "567394", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Format", bold: true, color: "FFFFFF" })] })], shading: { fill: "567394", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Description & Usage", bold: true, color: "FFFFFF" })] })], shading: { fill: "567394", type: ShadingType.CLEAR } })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("tut_stones_logo.png")] }),
                new TableCell({ children: [new Paragraph("PNG")] }),
                new TableCell({ children: [new Paragraph("Official brand logo mark")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("pharaonic_temple_bg.png")] }),
                new TableCell({ children: [new Paragraph("PNG (1920x1080)")] }),
                new TableCell({ children: [new Paragraph("Karnak Pharaonic Temple background image for Slide 1")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("egyptian_stone_beauty_bg.png")] }),
                new TableCell({ children: [new Paragraph("PNG (1920x1080)")] }),
                new TableCell({ children: [new Paragraph("Egyptian Pyramids & stone relief background for Slide 2")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("factory_processing.png")] }),
                new TableCell({ children: [new Paragraph("PNG (1920x1080)")] }),
                new TableCell({ children: [new Paragraph("Industrial gangsaw machinery & polishing factory banner")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("packaging_loading.png")] }),
                new TableCell({ children: [new Paragraph("PNG (1920x1080)")] }),
                new TableCell({ children: [new Paragraph("ISPM-15 wooden crate packaging & container lashing preview")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("about_craft.png")] }),
                new TableCell({ children: [new Paragraph("PNG")] }),
                new TableCell({ children: [new Paragraph("Egyptian stonemasonry craftsmanship feature image")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("marble_calacatta.png")] }),
                new TableCell({ children: [new Paragraph("PNG")] }),
                new TableCell({ children: [new Paragraph("Egyptian Galala / Calacatta Marble swatch tile")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("granite_black_galaxy.png")] }),
                new TableCell({ children: [new Paragraph("PNG")] }),
                new TableCell({ children: [new Paragraph("Egyptian Black Granite swatch tile")] })
              ]
            })
          ]
        }),

        // 5. Contact Details
        new Paragraph({
          text: "5. Official Company Contact Details",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Factory Address: ", bold: true }),
            new TextRun("Plot D1 & D2 – Industrial Zone – Shak El Thoaban – Tura – Maadi – Cairo – Egypt.")
          ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Google Maps Location: ", bold: true }),
            new TextRun("https://maps.app.goo.gl/aJqNQiZidc59BU3h7")
          ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Contact Number / WhatsApp: ", bold: true }),
            new TextRun("+201104539397")
          ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Official Emails: ", bold: true }),
            new TextRun("info@tutstones.com | sales@tutstones.com")
          ],
          spacing: { after: 200 }
        })
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const targetPath = path.join(__dirname, 'design_assets', 'TUT_Stones_Design_Specification.docx');
  fs.writeFileSync(targetPath, buffer);
  console.log('Word document successfully updated at:', targetPath);
}

createDesignDoc().catch(err => {
  console.error('Error creating Word doc:', err);
  process.exit(1);
});
