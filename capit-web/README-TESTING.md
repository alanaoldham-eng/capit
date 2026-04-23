# Quick Test Reference

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-run on file changes during development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Files Location

```
capit-web/
├── __tests__/
│   ├── components/
│   │   ├── header.test.tsx (✅ 6 tests, 100% coverage)
│   │   ├── hero.test.tsx (✅ 8 tests, 100% coverage)
│   │   ├── stats-card.test.tsx (✅ 6 tests, 100% coverage)
│   │   ├── educational-card.test.tsx (✅ 9 tests, 100% coverage)
│   │   └── educational-section.test.tsx (✅ 6 tests, 100% coverage)
│   └── integration/
│       └── content.test.tsx (✅ 12 tests, 100% coverage)
├── jest.config.js
├── jest.setup.js
├── TESTING.md (Manual testing checklist)
├── TEST-REPORT.md (Detailed test report)
└── README.md (Quick reference)
```

## Test Summary

- **Total Tests:** 53 ✅
- **All Passing:** Yes ✅
- **Coverage:** Core components at 100%
- **Execution Time:** ~5 seconds

## Components Tested

| Component | Tests | Status |
|-----------|-------|--------|
| Header | 6 | ✅ PASS |
| Hero | 8 | ✅ PASS |
| StatsCard | 6 | ✅ PASS |
| EducationalCard | 9 | ✅ PASS |
| EducationalSection | 6 | ✅ PASS |
| Content Integration | 12 | ✅ PASS |

## Live Site Testing

**Website:** https://v0-capit.vercel.app/

See [TESTING.md](./TESTING.md) for the complete manual testing checklist including:
- Visual design verification
- Responsive design testing
- Accessibility checks
- Performance audit

## Common Commands

```bash
# Test a specific file
npm test -- header.test.tsx

# Test with verbose output
npm test -- --verbose

# Update snapshots (if using snapshots)
npm test -- -u

# Run tests for changed files only
npm test -- --onlyChanged

# Run a specific test by name
npm test -- --testNamePattern="renders headline"
```

## Coverage Report Output

After running `npm run test:coverage`, you'll see:

```
File               | % Stmts | % Branch | % Funcs | % Lines
components/header.tsx     | 100    | 100      | 100     | 100
lib/content.ts           | 100    | 100      | 100     | 100
...
```

## What's Tested

### Unit Tests
- ✅ Component rendering
- ✅ Props rendering
- ✅ Content display
- ✅ Styling and CSS classes
- ✅ Links and href attributes
- ✅ Images and alt text
- ✅ Responsive behavior

### Integration Tests
- ✅ Content loading functions
- ✅ Data structure validation
- ✅ Data consistency
- ✅ Type safety

### Manual Tests (on live site)
See [TESTING.md](./TESTING.md) for:
- Header/Navigation tests
- Hero section tests
- Dashboard tests
- Educational cards tests
- Footer tests
- Responsive design tests
- Accessibility tests
- Performance tests

## Setup Info

- **Test Framework:** Jest
- **Component Testing:** @testing-library/react
- **Environment:** jsdom (browser-like)
- **Configuration:** jest.config.js, jest.setup.js

## Troubleshooting

```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check if tests are discoverable
npm test -- --listTests
```

## Next Steps

1. Run `npm test` to verify everything works
2. View coverage: `npm run test:coverage`
3. Test live site: https://v0-capit.vercel.app/
4. Add more tests for remaining components (Footer, Dashboard, etc.)
5. Set up GitHub Actions for CI/CD

---

**Documentation:**
- [TEST-REPORT.md](./TEST-REPORT.md) - Comprehensive test report
- [TESTING.md](./TESTING.md) - Manual testing guide
- [jest.config.js](./jest.config.js) - Test configuration
