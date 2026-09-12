/** @jest-environment node */
import fs from "fs"
import os from "os"
import path from "path"
import { getRecords } from "@/lib/records"

/** A throwaway records folder; string values are written verbatim, objects as JSON. */
function fixture(files: Record<string, unknown>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "capit-records-"))
  for (const [name, body] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), typeof body === "string" ? body : JSON.stringify(body))
  }
  return dir
}

describe("getRecords", () => {
  it("returns an empty list when the folder does not exist", () => {
    expect(getRecords(path.join(os.tmpdir(), `capit-no-records-${Date.now()}`))).toEqual([])
  })

  it("prefers an uploaded file over a pasted link", () => {
    const [record] = getRecords(
      fixture({ "a.json": { title: "A", url: "https://example.gov/a.pdf", file: "/images/records/a.pdf" } })
    )
    expect(record.href).toBe("/images/records/a.pdf")
    expect(record.isExternal).toBe(false)
  })

  it("flags PDFs and external links", () => {
    const [record] = getRecords(fixture({ "a.json": { title: "A", url: "https://example.gov/report.PDF?v=2" } }))
    expect(record).toMatchObject({ isPdf: true, isExternal: true })
  })

  it("lists dated records newest first, then undated records A-Z", () => {
    const records = getRecords(
      fixture({
        "1.json": { title: "Zulu", url: "/z.pdf" },
        "2.json": { title: "Old", url: "/o.pdf", date: "2024-01-01T00:00:00.000Z" },
        "3.json": { title: "Alpha", url: "/a.pdf" },
        "4.json": { title: "New", url: "/n.pdf", date: "2026-06-01T00:00:00.000Z" },
      })
    )
    expect(records.map((r) => r.title)).toEqual(["New", "Old", "Alpha", "Zulu"])
  })

  it("never turns an unsafe scheme or protocol-relative URL into a link", () => {
    const records = getRecords(
      fixture({
        "a.json": { title: "A", url: "javascript:alert(1)" },
        "b.json": { title: "B", url: "//evil.example/x.pdf" },
        "c.json": { title: "C", url: "data:application/pdf;base64,AAAA" },
      })
    )
    expect(records.map((r) => r.href)).toEqual([null, null, null])
  })

  it("skips invalid JSON and untitled records, and tolerates a BOM", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
    const records = getRecords(
      fixture({
        "bad.json": "{ not json",
        "untitled.json": { url: "/x.pdf" },
        "bom.json": "\uFEFF" + JSON.stringify({ title: "With BOM", url: "/b.pdf" }),
        "notes.txt": "ignored",
      })
    )
    expect(records.map((r) => r.title)).toEqual(["With BOM"])
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("bad.json"))
    warn.mockRestore()
  })

  it("loads the committed seed records with working links", () => {
    const records = getRecords()
    expect(records.length).toBeGreaterThan(0)
    for (const record of records) expect(record.href).toMatch(/^https:\/\/.+\.pdf$/)
  })
})
