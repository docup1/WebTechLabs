// Модуль для предотвращения висячих предлогов
(function() {
    const PREPOSITIONS = [
        "в", "и", "к", "с", "у", "о", "а", "но",
        "от", "до", "на", "по", "под", "при", "про",
        "над", "без", "для", "из"
    ];

    const EXCLUDE_TAGS = new Set([
        "SCRIPT", "STYLE", "CODE", "PRE", "KBD", "SAMP",
        "TEXTAREA", "OPTION", "NOSCRIPT", "SVG"
    ]);

    const regex = new RegExp(`(^|\\s)(${PREPOSITIONS.join("|")})(\\s+)`, "gi");

    function isExcluded(node) {
        let parent = node.parentNode;
        while (parent && parent.nodeType === 1) {
            if (EXCLUDE_TAGS.has(parent.tagName)) return true;
            parent = parent.parentNode;
        }
        return false;
    }

    function processTextNode(node) {
        if (!node?.nodeValue) return;

        const original = node.nodeValue;
        if (original.trim().length < 2) return;

        const replaced = original.replace(regex, (match, lead, prep) => {
            return lead + prep + "\u00A0";
        });

        if (replaced !== original) {
            node.nodeValue = replaced;
        }
    }

    function walkAndFix(root = document.body) {
        if (!root) return;

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while ((node = walker.nextNode())) {
            if (!isExcluded(node)) {
                processTextNode(node);
            }
        }
    }

    function init() {
        walkAndFix(document.body);

        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.addedNodes?.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 3) {
                            if (!isExcluded(node)) processTextNode(node);
                        } else if (node.nodeType === 1) {
                            if (!EXCLUDE_TAGS.has(node.tagName)) walkAndFix(node);
                        }
                    });
                }

                if (mutation.type === "characterData" && mutation.target) {
                    const target = mutation.target;
                    if (target.nodeType === 3 && !isExcluded(target)) {
                        processTextNode(target);
                    }
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.fixHungPrepositions = () => walkAndFix(document.body);
})();

// Модуль модального окна
(function() {
    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close-modal");
    const openButton = document.getElementById("open-modal");
    const form = document.querySelector("#form-incomplete form");
    const formIncomplete = document.getElementById("form-incomplete");
    const formComplete = document.getElementById("form-complete");

    if (!modal || !closeButton || !openButton || !form) return;

    function openModal() {
        modal.style.display = "flex";
        setTimeout(() => {
            modal.showModal();
        }, 10);
    }

    function closeModal() {
        modal.classList.add("dialog-menu--closing");
        setTimeout(() => {
            modal.close();
            modal.style.display = "none";
            modal.classList.remove("dialog-menu--closing");
            resetForm();
        }, 100);
    }

    function resetForm() {
        formIncomplete.style.display = "flex";
        formComplete.style.display = "none";
        form.reset();
    }

    function handleSubmit(event) {
        event.preventDefault();
        formIncomplete.style.display = "none";
        formComplete.style.display = "flex";
    }

    openButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    form.addEventListener("submit", handleSubmit);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.open) {
            closeModal();
        }
    });
})();