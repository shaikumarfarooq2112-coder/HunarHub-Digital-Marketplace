const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
};


// ================= LOAD CATEGORIES =================

async function loadCategories() {

    try {

        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/admin/categories",
            {
                method: "GET",
                headers: headers
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to load categories");
            return;
        }

        const container = document.getElementById("categoryList");

        container.innerHTML = "";

        if (!data.categories || data.categories.length === 0) {

            container.innerHTML = `
                <div class="admin-card">
                    <p>No categories found.</p>
                </div>
            `;

            return;
        }

        data.categories.forEach(category => {

            const card = document.createElement("div");

            card.className = "admin-card";

            let skillsHTML = "";

            if (category.skills && category.skills.length > 0) {

                skillsHTML = category.skills.map(skill => `
                    <li>
                        ${skill}

                        <button
                            onclick="deleteSkill('${category._id}', '${encodeURIComponent(skill)}')">
                            Delete
                        </button>
                    </li>
                `).join("");

            } else {

                skillsHTML = `
                    <li>No skills added yet.</li>
                `;
            }

            card.innerHTML = `

                <h3>${category.name}</h3>

                <p>
                    <strong>Skills:</strong>
                </p>

                <ul>
                    ${skillsHTML}
                </ul>

                <input
                    type="text"
                    id="skill-${category._id}"
                    placeholder="Enter skill"
                >

                <button
                    onclick="addSkill('${category._id}')">
                    Add Skill
                </button>

                <button
                    onclick="deleteCategory('${category._id}')">
                    Delete Category
                </button>

            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        document.getElementById("categoryList").innerHTML =
            "<p>Unable to connect to server.</p>";
    }
}


// ================= ADD CATEGORY =================

async function addCategory() {

    const input = document.getElementById("categoryName");

    const name = input.value.trim();

    if (!name) {

        alert("Please enter category name.");

        return;
    }

    try {

        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/admin/categories",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    name: name
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Unable to add category");

            return;
        }

        alert("Category added successfully!");

        input.value = "";

        loadCategories();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");
    }
}


// ================= ADD SKILL =================

async function addSkill(categoryId) {

    const input = document.getElementById(
        "skill-" + categoryId
    );

    const skill = input.value.trim();

    if (!skill) {

        alert("Please enter skill name.");

        return;
    }

    try {

        const response = await fetch(
            `https://hunarhub-backend-i8s7.onrender.com/api/admin/categories/${categoryId}/skills`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    skill: skill
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Unable to add skill");

            return;
        }

        alert("Skill added successfully!");

        input.value = "";

        loadCategories();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");
    }
}


// ================= DELETE CATEGORY =================

async function deleteCategory(id) {

    if (!confirm("Delete this category?")) {
        return;
    }

    try {

        const response = await fetch(
            `https://hunarhub-backend-i8s7.onrender.com/api/admin/categories/${id}`,
            {
                method: "DELETE",
                headers: headers
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Unable to delete category");

            return;
        }

        alert("Category deleted successfully!");

        loadCategories();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");
    }
}


// ================= DELETE SKILL =================

async function deleteSkill(categoryId, encodedSkill) {

    const skill = decodeURIComponent(encodedSkill);

    if (!confirm("Delete skill: " + skill + "?")) {
        return;
    }

    try {

        const response = await fetch(
            `https://hunarhub-backend-i8s7.onrender.com/api/admin/categories/${categoryId}/skills/${encodedSkill}`,
            {
                method: "DELETE",
                headers: headers
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Unable to delete skill");

            return;
        }

        alert("Skill deleted successfully!");

        loadCategories();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");
    }
}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}


// ================= START =================

loadCategories();