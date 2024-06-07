{
  if (window.innerWidth >= 768) {
    const skillsContents = document.querySelector(".p-skills__contents");
    const worksContents = document.querySelector(".p-works__contents");

    const skillsHeight = skillsContents.offsetHeight;
    const worksHeight = worksContents.offsetHeight;

    if (skillsHeight < worksHeight) {
      skillsContents.style.height = worksHeight + "px";
    }
    // else {
    // worksContents.style.height = skillsHeight + "px";
    // }
  }
}
