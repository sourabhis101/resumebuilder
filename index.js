// ===== Utility: Live Preview Update =====
function updatePreview() {
  // Basic Info
  const name = document.getElementById("name").value || "sourabh";
  const title = document.getElementById("title").value || "Django Developer";
  const email = document.getElementById("email").value || "sourabh@domain.com";
  const phone = document.getElementById("phone").value || "+91 98765 43210";
  const location = document.getElementById("location").value || "City, Country";
  const linkedin = document.getElementById("Linkedin").value || "Linkedin url";
  const summary = document.getElementById("summary").value || "Short profile summary...";

  document.getElementById("p_name").textContent = name;
  document.getElementById("p_title").textContent = title;
  document.getElementById("p_contact").textContent = `${email} • ${phone} • ${location}`;
  document.getElementById("l_contact").textContent = `${linkedin} `;
  document.getElementById("p_summary").textContent = summary;

  // Avatar initials
  document.getElementById("avatar").textContent = name
    ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "JD";

  // Profile photo
  const photoInput = document.getElementById("photo");
  const avatar = document.getElementById("avatar");
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      avatar.style.backgroundImage = `url(${e.target.result})`;
      avatar.style.backgroundSize = "cover";
      avatar.textContent = "";
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    avatar.style.backgroundImage = "";
  }

  // ===== Education =====
  const eduContainer = document.getElementById("p_education");
  eduContainer.innerHTML = "";
  document.querySelectorAll("#educations .eduItem").forEach(edu => {
    const school = edu.querySelector(".school").value;
    const year = edu.querySelector(".eyear").value;
    const grade = edu.querySelector(".egrade").value;

    if (school) {
      const div = document.createElement("div");
      div.className = "edu-preview";
      div.innerHTML = `<strong>${school}</strong> (${year || ""}) ${grade ? " - " + grade : ""}`;
      eduContainer.appendChild(div);
    }
  });

  // ===== Experience =====
  const expContainer = document.getElementById("p_experience");
  const expTitle = expContainer.previousElementSibling;
  expContainer.innerHTML = "";
  document.querySelectorAll("#experiences .expItem").forEach(exp => {
    const cmp = exp.querySelector(".cmp").value;
    const from = exp.querySelector(".from").value;
    const to = exp.querySelector(".to").value;
    const details = exp.querySelector(".details").value;

    if (cmp || details) {
      const div = document.createElement("div");
      div.className = "exp-preview";
      div.innerHTML = `<strong>${cmp || ""}</strong> (${from || ""} - ${to || ""})<br><span>${details || ""}</span>`;
      expContainer.appendChild(div);
    }
  });
  expTitle.style.display = expContainer.children.length ? "block" : "none";

  // ===== Skills =====
  const skillContainer = document.getElementById("p_skills");
  skillContainer.innerHTML = "";
  document.querySelectorAll("#skillsList .skillItem").forEach(skill => {
    const sname = skill.querySelector(".skillName").value;
    if (sname) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = sname;
      skillContainer.appendChild(span);
    }
  });

  // ===== Projects =====
  const projContainer = document.getElementById("p_projects");
  const projTitle = projContainer.previousElementSibling;
  projContainer.innerHTML = "";
  document.querySelectorAll("#projectsList .projItem").forEach(proj => {
    const pname = proj.querySelector(".projName").value;
    const pdesc = proj.querySelector(".projDesc").value;
    const plink = proj.querySelector(".projLink").value;

    if (pname) {
      const div = document.createElement("div");
      div.className = "proj-preview";
      div.innerHTML = `<strong>${pname}</strong> 
        ${plink ? ` - <a href="${plink}" target="_blank">${plink}</a>` : ""} 
        <br><span>${pdesc || ""}</span>`;
      projContainer.appendChild(div);
    }
  });
  projTitle.style.display = projContainer.children.length ? "block" : "none";

  // ===== Certificates =====
  const certContainer = document.getElementById("p_certificates");
  const certTitle = certContainer.previousElementSibling;
  certContainer.innerHTML = "";
  document.querySelectorAll("#certifications .certItem").forEach(cert => {
    const cname = cert.querySelector(".certName").value;
    const cyear = cert.querySelector(".certYear").value;

    if (cname) {
      const div = document.createElement("div");
      div.className = "cert-preview";
      div.innerHTML = `<strong>${cname}</strong>${cyear ? " (" + cyear + ")" : ""}`;
      certContainer.appendChild(div);
    }
  });
  certTitle.style.display = certContainer.children.length ? "block" : "none";

  // ===== Interests =====
  const intContainer = document.getElementById("p_interests");
  const intTitle = intContainer.previousElementSibling;
  intContainer.innerHTML = "";
  document.querySelectorAll("#interestsList .intItem").forEach(int => {
    const iname = int.querySelector(".intName").value;
    if (iname) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = iname;
      intContainer.appendChild(span);
    }
  });
  intTitle.style.display = intContainer.children.length ? "block" : "none";

  // ===== Languages =====
  const langContainer = document.getElementById("p_languages");
  const langTitle = langContainer.previousElementSibling;
  langContainer.innerHTML = "";
  document.querySelectorAll("#languagesList .langItem").forEach(lang => {
    const lname = lang.querySelector(".langName").value;
    if (lname) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = lname;
      langContainer.appendChild(span);
    }
  });
  langTitle.style.display = langContainer.children.length ? "block" : "none";
}

// ===== Add / Remove Experience =====
document.getElementById("addExp").addEventListener("click", () => {
  const tpl = document.getElementById("expTpl").content.cloneNode(true);
  const item = tpl.querySelector(".expItem");
  item.querySelector(".removeExp").addEventListener("click", () => {
    item.remove();
    updatePreview();
  });
  item.querySelectorAll("input, textarea").forEach(el => el.addEventListener("input", updatePreview));
  document.getElementById("experiences").appendChild(item);
  updatePreview();
});

// ===== Add / Remove Education =====
document.getElementById("addEdu").addEventListener("click", () => {
  const tpl = document.getElementById("eduTpl").content.cloneNode(true);
  const item = tpl.querySelector(".eduItem");
  item.querySelector(".removeEdu").addEventListener("click", () => {
    item.remove();
    updatePreview();
  });
  item.querySelectorAll("input").forEach(el => el.addEventListener("input", updatePreview));
  document.getElementById("educations").appendChild(item);
  updatePreview();
});

// ===== Add / Remove Skills =====
document.getElementById("addSkill").addEventListener("click", () => {
  const tpl = document.getElementById("skillTpl").content.cloneNode(true);
  const item = tpl.querySelector(".skillItem");
  item.querySelector(".removeSkill").addEventListener("click", () => {
    item.remove();
    updatePreview();
  });
  item.querySelectorAll("input").forEach(el => el.addEventListener("input", updatePreview));
  document.getElementById("skillsList").appendChild(item);
  updatePreview();
});

// ===== Add / Remove Projects =====
document.getElementById("addProject").addEventListener("click", () => {
  const tpl = document.getElementById("projTpl").content.cloneNode(true);
  const item = tpl.querySelector(".projItem");
  item.querySelector(".removeProj").addEventListener("click", () => {
    item.remove();
    updatePreview();
  });
  item.querySelectorAll("input, textarea").forEach(el => el.addEventListener("input", updatePreview));
  document.getElementById("projectsList").appendChild(item);
  updatePreview();
});

// ===== Add / Remove Certificates =====
document.getElementById("addCert").addEventListener("click", () => {
  const tpl = document.getElementById("certTpl").content.cloneNode(true);
  const item = tpl.querySelector(".certItem");
  item.querySelector(".removeCert").addEventListener("click", () => {
    item.remove();
    updatePreview();
  });
  item.querySelectorAll("input").forEach(el => el.addEventListener("input", updatePreview));
  document.getElementById("certifications").appendChild(item);
  updatePreview();
});

// ===== Add / Remove Interests =====
document.getElementById("addInterest").addEventListener("click", () => {
  const item = document.createElement("div");
  item.className = "intItem section";
  item.innerHTML = `
    <label>Interest</label>
    <input class="intName" type="text" placeholder="e.g. Reading" />
    <div style="text-align:right;margin-top:6px">
      <button class="removeInt btn" style = "background:#ef4444" type="button">Remove</button>
    </div>`;
  item.querySelector(".removeInt").addEventListener("click", () => {
    item.remove();
    updatePreview();
  });
  item.querySelectorAll("input").forEach(el => el.addEventListener("input", updatePreview));
  document.getElementById("interestsList").appendChild(item);
  updatePreview();
});

// ===== Add / Remove Languages =====
document.getElementById("addLanguage").addEventListener("click", () => {
  const item = document.createElement("div");
  item.className = "langItem section";
  item.innerHTML = `
    <label>Language</label>
    <input class="langName" type="text" placeholder="e.g. English" />
    <div style="text-align:right;margin-top:6px">
      <button class="removeLang btn" style = "background:#ef4444" type="button">Remove</button>
    </div>`;
  item.querySelector(".removeLang").addEventListener("click", () => {
    item.remove();
    updatePreview();
  });
  item.querySelectorAll("input").forEach(el => el.addEventListener("input", updatePreview));
  document.getElementById("languagesList").appendChild(item);
  updatePreview();
});

// ===== Reset Form =====
document.getElementById("resetBtn").addEventListener("click", () => {
  document.querySelectorAll("input, textarea").forEach(el => (el.value = ""));
  document.getElementById("experiences").innerHTML = "";
  document.getElementById("educations").innerHTML = "";
  document.getElementById("skillsList").innerHTML = "";
  document.getElementById("projectsList").innerHTML = "";
  document.getElementById("certifications").innerHTML = "";
  document.getElementById("interestsList").innerHTML = "";
  document.getElementById("languagesList").innerHTML = "";
  updatePreview();
});

// ===== Print / PDF =====
document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});
// ===== PDF Download =====
document.getElementById("downloadPdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
  orientation: "portrait",
  unit: "pt",
  format: "a4",
});
  

  const A4_WIDTH_PT = 595.28;

  const resume = document.getElementById("preview");
 

  doc.html(resume, {
    callback: function (doc) {
      doc.save("resume.pdf");
      resume.style.fontSize = '12px';
    },
    margin: [30, 30, 30, 30], // top, left, bottom, right
    autoPaging: "text",
    x: 30,
    y: 30,

    width: A4_WIDTH_PT - 60, // A4 width minus left and right margins
    windowWidth: resume.offsetWidth,
  });
});


// ===== Live Bind for Inputs =====
document.querySelectorAll("input, textarea").forEach(el => {
  el.addEventListener("input", updatePreview);
});

// ===== Init =====
updatePreview();
