from datetime import datetime
from jinjax import Catalog
from sys import argv
from os import path
import re

def tokens_converter(file_data) -> dict:
	tokens = { # Function Return
		"date": datetime.today().strftime("%d-%m-%Y"),
		"CodeBlock": False,
	}

	# Special Chars Conversion
	chars = [
		["&", "&amp;"],
		["<", "&lt;"],
		[">", "&gt;"],
		["\t", "&emsp;"]
	]
	for char, replacer in chars:
		file_data = file_data.replace(char, replacer)

	# Titles Conversion
	matches = re.findall(r"(### (.+))", file_data)
	for title in matches:
		file_data = file_data.replace(title[0], f"<h3>{title[1]}</h3>")
	
	# URLs Conversion
	matches = re.findall(r"(\[(.+)\]\(([^\(\)]+)\))", file_data)
	for url in matches:
		file_data = file_data.replace(url[0], f"""<a href="{url[2]}" target="_blank">{url[1]}</a>""")

	# Bold Text Conversion
	matches = re.findall(r"(\*\*([^*\n]+)\*\*)", file_data)
	for bold in matches:
		file_data = file_data.replace(bold[0], f"""<span style="font-weight: bold;">{bold[1]}</span>""")

	# Italic Text Conversion
	matches = re.findall(r"(\*([^*\n]+)\*)", file_data)
	for italic in matches:
		file_data = file_data.replace(italics[0], f"""<span style="font-style: italic;">{italics[1]}</span>""")

	# Unordered Lists Conversion
	matches = re.findall(r"(\* (.+))", file_data)
	complete_matches = [ match[0] for match in matches ]
	replace_matches = [ match[1] for match in matches ]
	idx_begin = 0
	for idx_current in range(len(complete_matches)):
		test_string = "\n".join(complete_matches[idx_begin:idx_current])

		if not test_string in file_data: # Deals with All list groups
			replace_string = "\n".join(complete_matches[idx_begin:idx_current-1])
			replaceBy_string = ""
			for idx_replace in range(idx_begin, idx_current-1):
				replaceBy_string += f"""<li>{replace_matches[idx_replace]}</li>\n"""
			file_data = file_data.replace(replace_string, f"""<ul>\n{replaceBy_string}</ul>""")
			idx_begin = idx_current-1

		if idx_current == len(complete_matches)-1: # Deals with last list group
			replace_string = "\n".join(complete_matches[idx_begin:])
			replaceBy_string = ""
			for idx_replace in range(idx_begin, idx_current+1):
				replaceBy_string += f"""<li>{replace_matches[idx_replace]}</li>\n"""
			file_data = file_data.replace(replace_string, f"""<ul>\n{replaceBy_string}</ul>""")
	# For Memory Optimization: Unused Variables
	del complete_matches, replace_matches, idx_begin

	# Code Blocks Conversion
	matches = re.findall(r"(```([^`]+)```)", file_data)
	code_lines = [] # Will be used in the next conversion process
	for match in matches:
		tokens["CodeBlock"] = True
		code = match[1].replace("\n", "<br>").replace("<br>", "", 1)
		code_lines.append(code)
		file_data = file_data.replace(match[0], f"""<div class="code-block">{code}</div><br>""")

	# Paragraphs Conversion
	p_tokens = file_data.split("\n")
	code_lines = "\n".join(code_lines)
	for p_token in p_tokens:
		checks = [
			not re.match(r"""^<(?!span)(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>""", p_token),
			not p_token in code_lines,
			not p_token == "",
			not p_token == "\n"
		]
		if all(checks):
			file_data = file_data.replace(p_token, f"""<p>{p_token}</p>""")
	# For Memory Optimization: Unused Variables
	del p_tokens, code_lines
	
	tokens["data"] = file_data
	return tokens


if __name__ == "__main__":
	filename = argv[1]
	if not (path.isfile(f"./{filename}") and re.match(r"^.+\.md$", filename)):
		raise ValueError("Invalid provided file")

	file_data = open(filename, "r").read()
	tokens = tokens_converter(file_data)
	
	template = Catalog()
	template.add_folder("JinjaTemplates")
	template = template.render("BlogTemplate", **tokens)

	with open(f'{argv[1].rstrip(".md")}.ejs', "w") as file:
		file.write(template)




