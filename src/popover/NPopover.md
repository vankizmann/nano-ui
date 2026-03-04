### Good to know

- When using NPopover force close should be handled with a lot of care. Because the blocking queue could break and a forced clear will be needed - and for sure will break something!
- 200ms is the default timeout for the blocking queue. Thats only intended for mobile devices and need to be patched out, so it only applies to viewports < 640px or so.
- Popovers below a modal or any other element type other than popover will block the deconstruction so when you return to the layer you start where you left off. If you build a overlay which uses Pointer.prevent() you should use popover as a type if you dont want this behavior.

### Planned
- [ ] NPopoverGuide (For ui instructions with counter)
- [ ] NPopoverConfirm (Confirm variant which does not block ui)