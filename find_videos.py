import urllib.request
import re

queries = ['ez bar curl', 'preacher curl machine', 'dumbbell curl', 'hammer curl', 'cable curl', 'skull crusher', 'dips machine']

for q in queries:
    url = 'https://www.youtube.com/results?search_query=' + q.replace(' ', '+')
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode()
        videos = re.findall(r'"videoId":"(.*?)"', html)
        # Filter out common non-video IDs (like short characters or duplicates)
        videos = [v for v in videos if len(v) == 11]
        print(f"{q}: {videos[0] if videos else 'NONE'}")
    except Exception as e:
        print(f"Error {q}: {e}")
