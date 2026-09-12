/** @jest-environment node */
import { DEFAULT_MONTHS_PER_PAGE, clampPageSize, paginate, parsePeriod, rangeLabel } from "@/lib/month-pages"

describe("month paging helpers", () => {
  it("splits entries into pages", () => {
    expect(paginate([1, 2, 3, 4, 5, 6, 7], 6)).toEqual([[1, 2, 3, 4, 5, 6], [7]])
    expect(paginate([1, 2, 3], 6)).toEqual([[1, 2, 3]])
    expect(paginate([], 6)).toEqual([])
  })

  it("keeps the editor's page size within 1-24, defaulting to 6", () => {
    expect(clampPageSize(undefined)).toBe(DEFAULT_MONTHS_PER_PAGE)
    expect(clampPageSize("")).toBe(DEFAULT_MONTHS_PER_PAGE)
    expect(clampPageSize("abc")).toBe(DEFAULT_MONTHS_PER_PAGE)
    expect(clampPageSize(0)).toBe(1)
    expect(clampPageSize(3.7)).toBe(3)
    expect(clampPageSize("4")).toBe(4)
    expect(clampPageSize(999)).toBe(24)
  })

  it("reads the month and year from a period", () => {
    expect(parsePeriod("July 2026 (to date)")).toEqual({ month: "Jul", year: 2026 })
    expect(parsePeriod("Sept. 2025")).toEqual({ month: "Sep", year: 2025 })
    expect(parsePeriod("dec 2024")).toEqual({ month: "Dec", year: 2024 })
    expect(parsePeriod("Q3 2026")).toBeNull()
    expect(parsePeriod("Juneteenth 2026")).toBeNull()
  })

  it("labels a page of newest-first months", () => {
    expect(rangeLabel(["July 2026 (to date)", "June 2026", "February 2026"])).toBe("Feb – Jul 2026")
    expect(rangeLabel(["February 2026", "January 2026", "November 2025"])).toBe("Nov 2025 – Feb 2026")
    expect(rangeLabel(["January 2026"])).toBe("Jan 2026")
    expect(rangeLabel(["Q1 2026", "Q4 2025"])).toBeNull()
    expect(rangeLabel([])).toBeNull()
  })
})
