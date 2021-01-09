export const isElementVisible = () => {
  const sections = document.querySelectorAll('.homepage-section');
  // Don't run the rest of the code if every section is already visible
  if (!document.querySelectorAll('.menu-item:not(.active)')) {
    return;
  }

  const bodyRect = document.body.getBoundingClientRect().top;
  const bodyRectAbs = Math.abs(document.body.getBoundingClientRect().top);

  for (const section of sections) {
    let sectionId = section.id;
    let sectionMenuItem = document.querySelector(
      `.menu-item#${sectionId.replace('-section', '')}`
    );
    sectionMenuItem.classList.remove('active');

    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    const sectionTopOffset = parseFloat(sectionTop - bodyRect).toFixed(0);
    const sectionBottomOffset = parseFloat(sectionBottom - bodyRect).toFixed(0);

    if (bodyRectAbs < sectionBottomOffset - 300 && bodyRectAbs > sectionTopOffset - 300) {
      sectionMenuItem.classList.add('active');
    }
  }
};

export const scrollToElement = (section) => {
  let elementToScroll = document.querySelector(`.homepage-section#${section}-section`);
  let elementToScrollMenu = document.querySelector(`.menu-item#${section}`);
  elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  elementToScrollMenu.classList.add('active');
};
