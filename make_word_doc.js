const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, ShadingType } = require('docx');

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
              text: "Official Brand & Design Specification Guide",
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
              text: "Egyptian Marble & Granite Export Web Application | Visual Identity System",
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
              text: "TUT Stones combines Egypt's 5,000-year geological heritage with modern luxury architectural design. The visual language is defined by rich stone textures, high-contrast dark modes, elegant Pharaonic color pigments (Terracotta Red, Nile Lapis Blue, Egyptian Gold), and classical typography."
            })
          ],
          spacing: { after: 200 }
        }),

        // 2. Color Palettes
        new Paragraph({
          text: "2. Color Palettes & Color Schemes",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 120 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Theme 3: Pharaonic Heritage (Primary Brand Theme)",
              bold: true,
              size: 22,
              color: "8D4F4E"
            })
          ],
          spacing: { before: 100, after: 100 }
        }),

        // Table for Theme 3
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Token Name", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Hex Code", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "RGB Value", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Usage", bold: true, color: "FFFFFF" })] })], shading: { fill: "8D4F4E", type: ShadingType.CLEAR } })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Egyptian Terracotta Red")] }),
                new TableCell({ children: [new Paragraph("#8D4F4E")] }),
                new TableCell({ children: [new Paragraph("rgb(141, 79, 78)")] }),
                new TableCell({ children: [new Paragraph("Primary CTAs, badges, header borders")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Nile Lapis Blue")] }),
                new TableCell({ children: [new Paragraph("#567394")] }),
                new TableCell({ children: [new Paragraph("rgb(86, 115, 148)")] }),
                new TableCell({ children: [new Paragraph("Subheaders, experience badges, icons")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Egyptian Sun Gold")] }),
                new TableCell({ children: [new Paragraph("#DFB77D")] }),
                new TableCell({ children: [new Paragraph("rgb(223, 183, 125)")] }),
                new TableCell({ children: [new Paragraph("Header bottom border, active indicators")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Papyrus Light Base")] }),
                new TableCell({ children: [new Paragraph("#F5E9D8")] }),
                new TableCell({ children: [new Paragraph("rgb(245, 233, 216)")] }),
                new TableCell({ children: [new Paragraph("Light theme background base")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Hieroglyph Charcoal")] }),
                new TableCell({ children: [new Paragraph("#241C18")] }),
                new TableCell({ children: [new Paragraph("rgb(36, 28, 24)")] }),
                new TableCell({ children: [new Paragraph("Body copy text readability")] })
              ]
            })
          ]
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Theme 1: Default Dark Luxury (Noir & Gold)",
              bold: true,
              size: 22,
              color: "B89025"
            })
          ],
          spacing: { before: 200, after: 100 }
        }),

        // Table for Theme 1
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Token Name", bold: true, color: "FFFFFF" })] })], shading: { fill: "333333", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Hex Code", bold: true, color: "FFFFFF" })] })], shading: { fill: "333333", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "RGB Value", bold: true, color: "FFFFFF" })] })], shading: { fill: "333333", type: ShadingType.CLEAR } }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Usage", bold: true, color: "FFFFFF" })] })], shading: { fill: "333333", type: ShadingType.CLEAR } })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Gold Primary")] }),
                new TableCell({ children: [new Paragraph("#D4AF37")] }),
                new TableCell({ children: [new Paragraph("rgb(212, 175, 55)")] }),
                new TableCell({ children: [new Paragraph("Primary CTAs, title spans")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Noir Dark Background")] }),
                new TableCell({ children: [new Paragraph("#0B0C0E")] }),
                new TableCell({ children: [new Paragraph("rgb(11, 12, 14)")] }),
                new TableCell({ children: [new Paragraph("Dark page body background")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Card Surface")] }),
                new TableCell({ children: [new Paragraph("#14161A")] }),
                new TableCell({ children: [new Paragraph("rgb(20, 22, 26)")] }),
                new TableCell({ children: [new Paragraph("Card containers & modals")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Text Primary")] }),
                new TableCell({ children: [new Paragraph("#F3F4F6")] }),
                new TableCell({ children: [new Paragraph("rgb(243, 244, 246)")] }),
                new TableCell({ children: [new Paragraph("High contrast white body text")] })
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
          text: "All high-resolution image files copied into design_assets/ folder:",
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
                new TableCell({ children: [new Paragraph("tut_stones_logo_without_background.png")] }),
                new TableCell({ children: [new Paragraph("PNG (Transparent)")] }),
                new TableCell({ children: [new Paragraph("Isolated brand logo emblem with transparent background")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("tut_stones_logo_with_background.png")] }),
                new TableCell({ children: [new Paragraph("PNG")] }),
                new TableCell({ children: [new Paragraph("Brand emblem set on dark Pharaonic stone texture")] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("tut_stones_logo.png")] }),
                new TableCell({ children: [new Paragraph("PNG")] }),
                new TableCell({ children: [new Paragraph("Original header navbar brand mark")] })
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

        // 5. Contact & Company Data
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
  console.log('Word document successfully created at:', targetPath);
}

createDesignDoc().catch(err => {
  console.error('Error creating Word doc:', err);
  process.exit(1);
});
