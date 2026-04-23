# End-to-End Testing Guide for CAPIT Web

Published URL: https://v0-capit.vercel.app/

## Manual Testing Checklist

Use this checklist to manually test the published website at https://v0-capit.vercel.app/

### Header Component Tests
- [ ] Logo displays correctly in header
- [ ] Navigation links (Home, Dashboard, Learn) are visible and clickable
- [ ] Navigation links show underline hover effect
- [ ] Buy CAPIT button has secondary color styling
- [ ] Buy CAPIT button links to Uniswap correctly
- [ ] Header has subtle bottom border

### Hero Section Tests
- [ ] Hero headline renders correctly ("Revolutionize" text visible)
- [ ] Hero headline is large and bold
- [ ] Hero description is readable
- [ ] Hero image displays on desktop
- [ ] Hero image is responsive (hides/resizes on mobile)
- [ ] CTA button ("Get Started") is clickable
- [ ] CTA button scales up on hover
- [ ] CTA button shadow increases on hover
- [ ] Hero section has gradient background

### Stats Dashboard Tests
- [ ] Stats section renders properly
- [ ] All stats cards display with numbers
- [ ] Stats values are large and bold
- [ ] Stats titles are small and uppercase
- [ ] Trend chart/graph displays
- [ ] Daily mint log shows entries
- [ ] State leaderboard displays with rankings
- [ ] Leaderboard shows states and well counts
- [ ] All dashboard data is visible and properly formatted

### Educational Cards Tests
- [ ] Educational section displays 3 cards on desktop
- [ ] Cards stack vertically on mobile (1 column)
- [ ] Cards show 2 columns on tablet (768px+)
- [ ] Card images load correctly
- [ ] Card titles are visible
- [ ] Card descriptions are readable
- [ ] "Learn More" buttons are clickable
- [ ] Buttons change color on hover
- [ ] Images zoom slightly on card hover

### Footer Section Tests
- [ ] Quote banner displays inspirational quote
- [ ] Quote has light background
- [ ] Footer logo and name visible
- [ ] Footer navigation links are clickable
- [ ] Social media icons display (X, LinkedIn)
- [ ] Social icons are clickable
- [ ] "Connect Wallet" button is visible
- [ ] Connect Wallet button has secondary color
- [ ] Copyright and legal links display at bottom

### Responsive Design Tests

**Mobile (375px width)**
- [ ] Navigation menu is hidden
- [ ] Only logo and CTA button show in header
- [ ] Hero section stacks vertically
- [ ] Cards display in single column
- [ ] Text is readable at this size
- [ ] Images are optimized for mobile

**Tablet (768px width)**
- [ ] Navigation appears
- [ ] Cards display in 2 columns
- [ ] Layout adapts smoothly

**Desktop (1024px+)**
- [ ] Full navigation menu visible
- [ ] 3 column grid for educational cards
- [ ] Optimal spacing and padding
- [ ] All content visible without scrolling

### Performance & Loading Tests
- [ ] Page loads quickly (< 3 seconds)
- [ ] Images load efficiently
- [ ] No broken image links
- [ ] Text renders without layout shift
- [ ] Animations are smooth (60fps)

### Browser Compatibility Tests
- [ ] Chrome desktop
- [ ] Firefox desktop
- [ ] Safari desktop
- [ ] Edge desktop
- [ ] Chrome mobile (Android)
- [ ] Safari mobile (iOS)

### Accessibility Tests
- [ ] All images have alt text
- [ ] Text has sufficient color contrast
- [ ] Keyboard navigation works (Tab key)
- [ ] Focus indicators visible on links/buttons
- [ ] Buttons and links have descriptive text

### Console & Error Tests
- [ ] No JavaScript errors in console
- [ ] No deprecation warnings
- [ ] No broken links
- [ ] External links open in new tab (target="_blank")

## How to Run Live Site Testing

1. **Open the website:** https://v0-capit.vercel.app/
2. **Open Developer Tools:** F12 or Cmd+Option+I
3. **Check Console tab:** Look for any errors or warnings
4. **Test responsiveness:**
   - Use DevTools device emulation (Ctrl+Shift+M)
   - Test at 375px, 768px, 1024px widths
5. **Use Lighthouse audit:**
   - DevTools → Lighthouse
   - Run test for Performance, Accessibility, Best Practices

## Tools for Testing

- **Chrome DevTools:** Built-in browser developer tools
- **Lighthouse:** Audit performance and accessibility (in DevTools)
- **WAVE:** Web accessibility checker (https://wave.webaim.org/)
- **axe DevTools:** Accessibility testing browser extension
- **PageSpeed Insights:** Google performance analysis (https://pagespeed.web.dev/)

## Common Issues to Watch For

- Images not loading or broken links
- Slow page load times
- Missing alt text on images
- Poor color contrast
- Broken responsive layout
- JavaScript errors in console
- Hovering effects not working
- Links not opening in new tabs where expected
