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

if (!deleteWord) {
    /**
     * @param {HTMLElement} el
     */
    function deleteWord(el) {
        if (el.value) {
            const match = el.value.slice(0, el.selectionStart - 1).match(/[^a-zA-Z0-9]/gi);
            const index = match ? el.value.lastIndexOf(match[match.length-1], el.selectionStart - 2) : -1;
            el.selectionStart = index + 1;
        } else if (el.innerText) {
            // contentEditable element detected
            // Use document.getSelection instead of el.selection*
            // anchorOffset -> selectionStart
            // focusOffset -> selectionEnd
            const s = document.getSelection()
            if (!el.isContentEditable) return;

            const match = el.innerText.slice(0, s.anchorOffset - 1).match(/[^a-zA-Z0-9]/gi);
            const index = match ? el.innerText.lastIndexOf(match[match.length-1], s.anchorOffset - 2) : -1;

            // Changing the selectionStart
            s.setBaseAndExtent(s.anchorNode, index + 1, s.focusNode, s.focusOffset);
        }

        // Using document.execCommand even though it is obselete. Should still be safe for chrome-based browser
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#browser_compatibility
        document.execCommand("delete")
    }
}

deleteWord(getActiveElement());
