// Data keluarga Dakumi
const familyData = {
    name: "A. Dakumi",
    children: [
        {
            name: "Suryami",
            spouse: "Carsiyan",
            children: [
                { name: "Sa'ad", spouse: "Suyem" },
                { name: "Waryu", spouse: "Supari" },
                { name: "Sibeng", spouse: "Wardan" },
                { name: "Tabyan", spouse: "Saruni" },
                { name: "Taiyah", spouse: "Casyono" },
            ]
        },
        {
            name: "Ndari",
            spouse: "Kendho (Sutoyo)",
            children: [
                { name: "Mukri", spouse: "Rahayu" },
                { name: "Casmirah", spouse: "Kusen" },
                { name: "Suryan", spouse: "Muryati" },
                { name: "Rasiwen", spouse: "Radan" },
                { name: "Comong", spouse: null },
            ]
        },
        {
            name: "Siru",
            spouse: "Narsid",
            children: [
                { name: "Sahuri", spouse: "Ilin", children: [{ name: "Isworo" }] },
                { name: "Rasidah", spouse: "Sinang" },
                { name: "Casmirah", spouse: "Sumarto" },
                { name: "Kembur (Waryadi)", spouse: null },
            ]
        },
        {
            name: "Redi Rahayu",
            spouse: "Yasir",
            children: [
                { name: "Casiun", spouse: "Asari" },
                { name: "Sunaryo", spouse: null },
                { name: "Saryu (Gombol)", spouse: "Suhari" },
                { name: "Sayumi", spouse: "Amat Nuryan" },
                { name: "Sayi", spouse: "Nursaid" },
            ]
        }
    ]
};

// Fungsi membuat pohon keluarga
function createTree(data, container) {
    const node = document.createElement("div");
    node.className = "node";
    node.textContent = `${data.name}${data.spouse ? " & " + data.spouse : ""}`;

    // Klik untuk menampilkan keturunan
    node.addEventListener("click", (e) => {
        e.stopPropagation();
        alert(`Keturunan dari ${data.name}: ${data.children?.map(child => child.name).join(", ") || "Tidak ada keturunan"}`);
    });

    container.appendChild(node);

    if (data.children && data.children.length > 0) {
        const childrenContainer = document.createElement("div");
        childrenContainer.className = "children";
        data.children.forEach(child => createTree(child, childrenContainer));
        container.appendChild(childrenContainer);
    }
}

// Render pohon keluarga
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("family-tree-container");
    createTree(familyData, container);

    // Fungsi pencarian
    document.getElementById("searchButton").addEventListener("click", () => {
        const searchName = document.getElementById("searchInput").value.trim();
        if (!searchName) return alert("Masukkan nama untuk mencari!");

        const result = findPerson(familyData, searchName);
        if (result) {
            alert(`Nama ditemukan: ${result.name}\nKeturunan: ${result.children?.map(child => child.name).join(", ") || "Tidak ada"}`);
        } else {
            alert("Nama tidak ditemukan!");
        }
    });
});

// Fungsi mencari nama dalam pohon
function findPerson(data, name) {
    if (data.name.toLowerCase() === name.toLowerCase()) return data;
    if (!data.children) return null;

    for (const child of data.children) {
        const result = findPerson(child, name);
        if (result) return result;
    }
    return null;
}
