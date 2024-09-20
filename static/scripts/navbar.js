const openCloseSidebarBtn = document.querySelector(".openCloseSidebarBtn");
console.log(openCloseSidebarBtn)
const sidebar = document.querySelector(".sidebar");

openCloseSidebarBtn.addEventListener("click", () => {
    console.log("click!")
    if (sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
    } else {
        sidebar.classList.add("open");
    }
});
