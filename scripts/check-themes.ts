import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SECTIONS_DIR = path.join(__dirname, "..", "components", "preview", "sections")
const THEMES = ["modern", "innovative", "professional"]

const sections = fs.readdirSync(SECTIONS_DIR).filter((f) => {
  return fs.statSync(path.join(SECTIONS_DIR, f)).isDirectory()
})

let hasError = false

for (const section of sections) {
  const sectionDir = path.join(SECTIONS_DIR, section)
  const files = fs.readdirSync(sectionDir)

  for (const theme of THEMES) {
    const expected = `${theme}.tsx`
    if (!files.includes(expected)) {
      console.error(`MISSING: ${section}/${expected}`)
      hasError = true
    }
  }

  const extras = files.filter((f) => f.endsWith(".tsx") && !THEMES.includes(f.replace(".tsx", "")))
  for (const extra of extras) {
    console.warn(`UNEXPECTED: ${section}/${extra}`)
  }
}

if (hasError) {
  console.error("\nTheme check failed — missing files detected.")
  process.exit(1)
} else {
  console.log(`All ${sections.length} sections have all ${THEMES.length} themes.`)
}
