export class SidebarUtil {
    static toggleSidebarOnShortcut(
        event: KeyboardEvent,
        toggleSidebar: () => void
    ) {
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "b"
        ) {
            event.preventDefault();
            toggleSidebar();
        }
    }
}
