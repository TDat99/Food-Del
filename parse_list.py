import os
import json
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm


def parse_listings(html_content):
    """Parse 1 file HTML, trả về danh sách tất cả tin đăng"""
    soup = BeautifulSoup(html_content, "html.parser")

    # Lấy tất cả thẻ card trong danh sách
    cards = soup.select("#product-lists-web > div")
    listings = []

    for card in cards:
        title_tag = card.select_one(".js__card-title")
        link_tag = card.select_one("a.js__product-link-for-product-id")

        price = card.select_one(".re__card-config-price")
        area = card.select_one(".re__card-config-area")
        price_per_m2 = card.select_one(".re__card-config-price_per_m2")

        location_tag = card.select_one(".re__card-location span:last-child")
        desc_tag = card.select_one(".js__card-description")
        agent_tag = card.select_one(".agent-name")
        phone_tag = card.select_one(".js__card-phone-btn span")

        listings.append({
            "title": title_tag.get_text(strip=True) if title_tag else None,
            "link": link_tag["href"] if link_tag else None,
            "price": price.get_text(strip=True) if price else None,
            "area": area.get_text(strip=True) if area else None,
            "price_per_m2": price_per_m2.get_text(strip=True) if price_per_m2 else None,
            "location": location_tag.get_text(strip=True) if location_tag else None,
            "description": desc_tag.get_text(strip=True) if desc_tag else None,
            "agent": agent_tag.get_text(strip=True) if agent_tag else None,
            "phone": phone_tag.get_text(strip=True) if phone_tag else None,
        })

    return listings


def get_all_html_files(folder_path):
    """Lấy danh sách tất cả file .html trong thư mục (bao gồm thư mục con)"""
    html_files = []
    for root, _, files in os.walk(folder_path):
        for f in files:
            if f.endswith(".html"):
                html_files.append(os.path.join(root, f))
    return html_files


def parse_file(file_path):
    """Đọc file HTML và parse tất cả tin đăng"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            html_content = f.read()
            listings = parse_listings(html_content)
            for item in listings:
                item["source_file"] = os.path.basename(file_path)
            return listings
    except Exception as e:
        print(f"⚠️ Lỗi khi đọc {file_path}: {e}")
        return []


def parse_all_html_in_folder(folder_path, output_json="result.json", max_workers=8):
    """Duyệt song song toàn bộ file HTML và lưu vào JSON"""
    html_files = get_all_html_files(folder_path)
    listings = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(parse_file, path): path for path in html_files}

        for future in tqdm(as_completed(futures), total=len(futures), desc="Parsing HTML files"):
            result = future.result()
            if result:
                listings.extend(result)

    # Ghi ra file JSON
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(listings, f, ensure_ascii=False, indent=2)

    print(f"✅ Đã lưu {len(listings)} tin vào {output_json}")


# ==== CHẠY ====
if __name__ == "__main__":
    parse_all_html_in_folder("scraper_output", "result_list.json", max_workers=8)
