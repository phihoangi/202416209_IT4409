/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const danhSach = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

function capNhatBoDem() {
	const cacTin = Array.from(danhSach.children);
	const soTinHien = cacTin.filter(tin => !tin.classList.contains("an")).length;
	boDem.textContent = `Đang hiển thị ${soTinHien}/${cacTin.length} tin`;
}

function locTin() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	let soTinHien = 0;

	for (const tin of danhSach.children) {
		const noiDung = `${tin.querySelector("h3").textContent} ${tin.querySelector("p").textContent}`.toLowerCase();
		const khop = noiDung.includes(tuKhoa);
		tin.classList.toggle("an", !khop);
		if (khop) {
			soTinHien += 1;
		}
	}

	khongThay.classList.toggle("an", soTinHien > 0);
	if (soTinHien === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
	}
	capNhatBoDem();
}

function taoTin(tieuDe, noiDung) {
	const tin = document.createElement("li");
	const ngay = document.createElement("span");
	const deMuc = document.createElement("h3");
	const doan = document.createElement("p");
	const nutMoRong = document.createElement("button");

	ngay.className = "time";
	ngay.textContent = homNay();
	deMuc.textContent = tieuDe;
	doan.textContent = noiDung;
	nutMoRong.type = "button";
	nutMoRong.className = "more";
	nutMoRong.textContent = "Read more >>";
	tin.append(ngay, deMuc, doan, nutMoRong);
	return tin;
}

oTimKiem.addEventListener("keyup", locTin);

danhSach.addEventListener("click", (e) => {
	if (!e.target.classList.contains("more")) {
		return;
	}

	const tin = e.target.closest("li");
	const doan = tin.querySelector("p");
	const daMo = doan.classList.toggle("day-du");
	e.target.textContent = daMo ? "Thu gọn <<" : "Read more >>";
});

nutDang.addEventListener("click", () => {
	if (oTieuDe.value === "" || oNoiDung.value === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	danhSach.prepend(taoTin(oTieuDe.value, oNoiDung.value));
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin();
});

locTin();
