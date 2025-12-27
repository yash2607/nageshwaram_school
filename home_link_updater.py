import os
import re

def update_home_link(file_path):
    with open(file_path, 'r', encoding='latin-1') as f:
        content = f.read()

    original_content = content
    
    content = re.sub(r'index\.php', 'index.html', content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated home link in: {file_path}")

def main():
    base_dir = "website/nageshwaram_school"
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                update_home_link(file_path)

if __name__ == "__main__":
    main()
