import os
import re

model_dir = "src/main/groovy/com/endlesstransit/model"

# Regex to match method blocks roughly (by finding the method signature and replacing Terminal. inside its body)
# A simpler approach: line by line processing.
# We keep track of which method we are currently in.

def process_file(path):
    with open(path, "r") as file:
        lines = file.readlines()

    out_lines = []
    in_target_method = False
    brace_depth = 0
    
    for line in lines:
        # Check if line is a signature of our target methods
        if re.search(r'void\s+processAction\(\s*Player\s+\w+\s*\)', line) or \
           re.search(r'String\s+getDescription\(\s*\)', line) or \
           re.search(r'List<String>\s+getExtraContent\(\s*Player\s+\w+\s*\)', line):
            
            # Change the signature
            line = re.sub(r'(void\s+processAction\(\s*Player\s+\w+)(\s*\))', r'\1, OutputFormatter fmt\2', line)
            line = re.sub(r'(String\s+getDescription\()(\s*\))', r'\1OutputFormatter fmt\2', line)
            line = re.sub(r'(List<String>\s+getExtraContent\(\s*Player\s+\w+)(\s*\))', r'\1, OutputFormatter fmt\2', line)
            
            # If it's an interface, it might end with a semicolon
            if '{' in line:
                in_target_method = True
                brace_depth = line.count('{') - line.count('}')
            elif ';' not in line: # Method might have '{' on next line
                in_target_method = True
                brace_depth = 0
                
            out_lines.append(line)
            continue
            
        if in_target_method:
            brace_depth += line.count('{') - line.count('}')
            # Replace Terminal. with fmt.
            line = re.sub(r'\bTerminal\.', 'fmt.', line)
            out_lines.append(line)
            if brace_depth <= 0 and '{' not in line and '}' in line: # End of method
                in_target_method = False
        else:
            # Maybe the '{' is on the next line after signature
            if '{' in line:
                brace_depth += line.count('{') - line.count('}')
            elif '}' in line:
                brace_depth += line.count('{') - line.count('}')
                
            out_lines.append(line)
            
    with open(path, "w") as file:
        file.writelines(out_lines)

for root, _, files in os.walk(model_dir):
    for f in files:
        if f.endswith(".groovy"):
            process_file(os.path.join(root, f))
