#!/usr/bin/env python3
"""
Script to wrap Card components with a div for proper dashed border spacing.
"""

import re
import sys

def wrap_card_with_div(content):
    # Pattern to match Card with the border class
    # Updated to handle optional trailing comma and flexible whitespace
    pattern = r'(<Card\s+class="h-full flex flex-col"\s+:class="\{\s*\'border-2 border-dashed border-primary p-2\'\s*:\s*(?:isDraggable|dragModeStore\.isEnabled|dragModeStore\.isGlobalDragMode),?\s*\}"\s*>)'
    
    if not re.search(pattern, content, re.DOTALL):
        return content, False
    
    # Find condition
    prop_match = re.search(r':class="\{\s*\'border-2 border-dashed border-primary p-2\'\s*:\s*(isDraggable|dragModeStore\.isEnabled|dragModeStore\.isGlobalDragMode)', content)
    if not prop_match:
        return content, False
    
    condition = prop_match.group(1)
    
    # Replace Card with wrapped version
    replacement = f'''<div
    :class="{{
      'border-2 border-dashed border-primary p-2 rounded-20': {condition},
    }}"
  >
    <Card class="h-full flex flex-col">'''
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Add closing </div>
    # We look for the last </Card> in the template section
    template_match = re.search(r'(<template>.*</Card>)\s*(</template>)', content, re.DOTALL)
    if template_match:
        before_closing = template_match.group(1)
        closing_template = template_match.group(2)
        new_content = content[:template_match.start()] + before_closing + '\n  </div>\n' + closing_template + content[template_match.end():]
        return new_content, True
    
    return content, False

if __name__ == "__main__":
    file_path = sys.argv[1]
    with open(file_path, 'r') as f:
        content = f.read()
    new_content, changed = wrap_card_with_div(content)
    if changed:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
