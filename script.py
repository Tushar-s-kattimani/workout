import urllib.request, re
try:
    html = urllib.request.urlopen('https://www.youtube.com/results?search_query=3d+chest+workout+animation').read().decode('utf-8')
    match = re.search(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
    print(match.group(1) if match else 'Not found')
except Exception as e:
    print('Error:', e)
