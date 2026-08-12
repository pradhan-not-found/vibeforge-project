import sys
lines = sys.stdin.readlines()
content = ''.join(lines)
content = content.replace('cofounder.co', 'the template').replace('Cofounder', 'the template').replace('cofounder', 'the template')
sys.stdout.write(content)
