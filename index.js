// ===== Utility: Live Preview Update =====
function updatePreview() {
  // Basic Info
  const getVal = (id, fallback = "") =>
    document.getElementById(id)?.value || fallback;

  document.getElementById("p_name").textContent = getVal("name", "sourabh");
  document.getElementById("p_title").textContent = getVal("title", "Django Developer");
  document.getElementById("p_contact").textContent = 
    `${getVal("email", "sourabh@domain.com")} • ${getVal("phone", "+91 98765 43210")} • ${getVal("location", "City, Country")}`;
  document.getElementById("l_contact").textContent = getVal("Linkedin", "Linkedin url");
  document.getElementById("p_summary").textContent = getVal("summary", "Short profile summary...");

  // ===== Generic Render Function =====
  const renderList = (selector, containerId, templateFn, toggleTitle = true) => {
    const container = document.getElementById(containerId);
    const title = toggleTitle ? container.previousElementSibling : null;
    container.innerHTML = "";

    document.querySelectorAll(selector).forEach(item => {
      const html = templateFn(item);
      if (html) container.appendChild(html);
    });

    if (title) title.style.display = container.children.length ? "block" : "none";
  };

  // Education
  renderList("#educations .eduItem", "p_education", edu => {
    const school = edu.querySelector(".school").value;
    if (!school) return null;
    const year = edu.querySelector(".eyear").value;
    const grade = edu.querySelector(".egrade").value;
    const div = document.createElement("div");
    div.className = "edu-preview";
    div.innerHTML = `<strong>${school}</strong> (${year || ""})${grade ? " - " + grade : ""}`;
    return div;
  });

  // Experience
  renderList("#experiences .expItem", "p_experience", exp => {
    const cmp = exp.querySelector(".cmp").value;
    const details = exp.querySelector(".details").value;
    if (!cmp && !details) return null;
    const from = exp.querySelector(".from").value;
    const to = exp.querySelector(".to").value;
    const div = document.createElement("div");
    div.className = "exp-preview";
    div.innerHTML = `<strong>${cmp || ""}</strong> (${from || ""} - ${to || ""})<br><span>${details || ""}</span>`;
    return div;
  });

  // Skills
  renderList("#skillsList .skillItem", "p_skills", skill => {
    const sname = skill.querySelector(".skillName").value;
    if (!sname) return null;
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = sname;
    return span;
  });

  // Projects
  renderList("#projectsList .projItem", "p_projects", proj => {
    const pname = proj.querySelector(".projName").value;
    if (!pname) return null;
    const pdesc = proj.querySelector(".projDesc").value;
    const plink = proj.querySelector(".projLink").value;
    const div = document.createElement("div");
    div.className = "proj-preview";
    div.innerHTML = `<strong>${pname}</strong> 
      ${plink ? ` - <a href="${plink}" target="_blank">${plink}</a>` : ""} 
      <br><span>${pdesc || ""}</span>`;
    return div;
  });

  // Certificates
  renderList("#certifications .certItem", "p_certificates", cert => {
    const cname = cert.querySelector(".certName").value;
    if (!cname) return null;
    const cyear = cert.querySelector(".certYear").value;
    const div = document.createElement("div");
    div.className = "cert-preview";
    div.innerHTML = `${cname}${cyear ? " (" + cyear + ")" : ""}`;
    return div;
  });

  // Interests
  renderList("#interestsList .intItem", "p_interests", int => {
    const iname = int.querySelector(".intName").value;
    if (!iname) return null;
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = iname;
    return span;
  });

  // Languages
  renderList("#languagesList .langItem", "p_languages", lang => {
    const lname = lang.querySelector(".langName").value;
    if (!lname) return null;
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = lname;
    return span;
  });
}

// ===== Generic Add Item Function =====
function addItem(buttonId, tplId, listId, removeClass) {
  document.getElementById(buttonId).addEventListener("click", () => {
    const tpl = document.getElementById(tplId)?.content.cloneNode(true);
    const item = tpl.querySelector(`.${removeClass.replace("remove", "").toLowerCase()}Item`) || tpl.querySelector(".section");

    item.querySelector(`.${removeClass}`).addEventListener("click", () => {
      item.remove();
      updatePreview();
    });

    item.querySelectorAll("input, textarea").forEach(el =>
      el.addEventListener("input", updatePreview)
    );

    document.getElementById(listId).appendChild(item);
    updatePreview();
  });
}

// ===== Add / Remove Bindings =====
addItem("addExp", "expTpl", "experiences", "removeExp");
addItem("addEdu", "eduTpl", "educations", "removeEdu");
addItem("addSkill", "skillTpl", "skillsList", "removeSkill");
addItem("addProject", "projTpl", "projectsList", "removeProj");
addItem("addCert", "certTpl", "certifications", "removeCert");

// Interests & Languages (custom because they are inline HTML not <template>)
function addSimpleItem(buttonId, listId, className, placeholder, removeClass) {
  document.getElementById(buttonId).addEventListener("click", () => {
    const item = document.createElement("div");
    item.className = `${className} section`;
    item.innerHTML = `
      <label>${className.replace("Item", "")}</label>
      <input class="${className.replace("Item", "Name")}" type="text" placeholder="e.g. ${placeholder}" />
      <div style="text-align:right;margin-top:6px">
        <button class="${removeClass} btn" style="background:#ef4444" type="button">Remove</button>
      </div>`;

    item.querySelector(`.${removeClass}`).addEventListener("click", () => {
      item.remove();
      updatePreview();
    });

    item.querySelectorAll("input").forEach(el => el.addEventListener("input", updatePreview));
    document.getElementById(listId).appendChild(item);
    updatePreview();
  });
}

addSimpleItem("addInterest", "interestsList", "intItem", "Reading", "removeInt");
addSimpleItem("addLanguage", "languagesList", "langItem", "English", "removeLang");

// ===== Reset Form =====
document.getElementById("resetBtn").addEventListener("click", () => {
  document.querySelectorAll("input, textarea").forEach(el => (el.value = ""));
  ["experiences","educations","skillsList","projectsList","certifications","interestsList","languagesList"]
    .forEach(id => document.getElementById(id).innerHTML = "");
  updatePreview();
});

// ===== Print / PDF =====

document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
  });

// ===== Live Bind for Inputs =====
document.querySelectorAll("input, textarea").forEach(el =>
  el.addEventListener("input", updatePreview)
);

// ===== Init =====
updatePreview();
