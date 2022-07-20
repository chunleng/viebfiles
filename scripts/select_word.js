if (!getActiveElement) {
    /**
      * @returns {HTMLElement}
      */
    function getActiveElement(element = document.activeElement) {
      const shadowRoot = element.shadowRoot;
      const contentDocument = element.contentDocument;

      if (shadowRoot && shadowRoot.activeElement) {
        return getActiveElement(shadowRoot.activeElement);
      }

      if (contentDocument && contentDocument.activeElement) {
        return getActiveElement(contentDocument.activeElement);
      }

      return element
    }
}

if (!selectWord) {
    /**
     * @param {HTMLElement} el
     */
    function selectWord(el) {
        if (el.value == null) return;
        const match = el.value.slice(0, el.selectionStart - 1).match(/[^a-zA-Z0-9]/gi);
        const index = match ? el.value.lastIndexOf(match[match.length-1], el.selectionStart - 2) : -1;
        el.selectionStart = index + 1;
    }
}

selectWord(getActiveElement());
