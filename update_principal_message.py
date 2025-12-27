import re

file_path = "website/nageshwaram_school/the-school.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_message = '<div class="col-sm-8"><h2 class="main-title">Principal\'s <span class="main-title mb-1 brand-color2">Message</span></h2><p>It is with great pleasure that I welcome you to Nageshwaram Education World, a school that is committed to providing an exceptional learning experience for every student. Our vision is to create a community of lifelong learners who are not only academically proficient but also socially and emotionally resilient.</p><p>We believe that education is a partnership between the school, students, and parents, and we are dedicated to fostering a collaborative environment where every voice is heard and valued. Our goal is to inspire our students to dream big, to think critically, and to act with compassion. We are committed to providing them with the tools, resources, and support they need to succeed in a rapidly changing world.</p><p>I invite you to join us on this exciting journey of learning and discovery. Together, we can empower our students to become the leaders and innovators of tomorrow.</p></div>'

# This regex will find the "Principal's Message" section and replace its content
content = re.sub(r'<div class="col-sm-8">\s*<h2 class="main-title">Principal\\'s\s*<span class="main-title mb-1 brand-color2">Message</span></h2>.*?</div>', new_message, content, flags=re.DOTALL)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully updated the Principal's Message.")