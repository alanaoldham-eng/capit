import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { RecentVerifiedRecords } from "@/components/recent-verified-records"

const months = [
  "July 2026 (to date)",
  "June 2026",
  "May 2026",
  "April 2026",
  "March 2026",
  "February 2026",
  "January 2026",
]

const content = {
  title: "Records Published by Month",
  currentDateLabel: "July 10, 2026",
  entries: months.map((period, i) => ({ period, wells: `${i + 1} wells` })),
}

const older = () => screen.getByRole("button", { name: "Show older months" })
const newer = () => screen.getByRole("button", { name: "Show newer months" })

describe("RecentVerifiedRecords paging", () => {
  it("opens on the newest page, with the updated date under the title", () => {
    render(<RecentVerifiedRecords content={content} />)
    expect(screen.getByText("July 2026 (to date)")).toBeInTheDocument()
    expect(screen.getByText("February 2026")).toBeInTheDocument()
    expect(screen.queryByText("January 2026")).not.toBeInTheDocument()
    expect(screen.getByText("Feb – Jul 2026")).toBeInTheDocument()
    expect(screen.getByText("Updated July 10, 2026")).toBeInTheDocument()
    expect(newer()).toBeDisabled()
    expect(older()).toBeEnabled()
  })

  it("steps back to older months and forward again", () => {
    render(<RecentVerifiedRecords content={content} />)

    fireEvent.click(older())
    expect(screen.getByText("January 2026")).toBeInTheDocument()
    expect(screen.queryByText("July 2026 (to date)")).not.toBeInTheDocument()
    expect(screen.getByText("Jan 2026")).toBeInTheDocument()
    expect(older()).toBeDisabled()
    expect(newer()).toBeEnabled()

    fireEvent.click(newer())
    expect(screen.getByText("July 2026 (to date)")).toBeInTheDocument()
    expect(newer()).toBeDisabled()
  })

  it("honours Months per Page from Tina", () => {
    render(<RecentVerifiedRecords content={{ ...content, pageSize: 3 }} />)
    expect(screen.getByText("May – Jul 2026")).toBeInTheDocument()
    fireEvent.click(older())
    expect(screen.getByText("Feb – Apr 2026")).toBeInTheDocument()
  })

  it("hides the arrows when every month fits on one page", () => {
    render(<RecentVerifiedRecords content={{ ...content, pageSize: 12 }} />)
    expect(screen.queryByRole("button", { name: /months/ })).not.toBeInTheDocument()
    expect(screen.getByText("Jan – Jul 2026")).toBeInTheDocument()
  })

  it("falls back to page numbers when periods aren't month names", () => {
    const quarters = { ...content, entries: ["Q2 2026", "Q1 2026", "Q4 2025"].map((period) => ({ period, wells: "1 wells" })), pageSize: 2 }
    render(<RecentVerifiedRecords content={quarters} />)
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument()
  })
})
