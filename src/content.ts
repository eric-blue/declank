function highlightPhrase(phrase: string): void {
  const regex = new RegExp(phrase, "gi");

  // --- 1. Handle text nodes ---
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (!node.nodeValue) continue;

    if (regex.test(node.nodeValue)) {
      // Traverse up to find button or input
      let parent: HTMLElement | null = node.parentElement;
      let highlightTarget: HTMLElement = node.parentElement!;

      while (parent) {
        if (parent.tagName === "BUTTON") {
          highlightTarget = parent;
          break;
        }
        parent = parent.parentElement;
      }

      highlightTarget.style.display = "none";
    }
  }

  // --- 2. Handle input[type=button|submit] separately ---
  const inputs = document.querySelectorAll<HTMLInputElement>('input[type="button"], input[type="submit"]');
  inputs.forEach(input => {
    if (
      (input.value && regex.test(input.value)) ||
      (input.getAttribute('aria-label') && regex.test(input.getAttribute('aria-label')!))
    ) {
      console.log('Highlighting input:', input);
      input.style.display = "none";
    }
  });
}

// Example list
const blockedList = [
  'AI mode',
  'Enhance with AI',
];

blockedList.forEach(phrase => highlightPhrase(phrase));

console.log('Highlighting complete');
