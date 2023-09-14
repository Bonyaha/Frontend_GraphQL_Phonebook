The question is about updateCache function in App.js:
Here is my question: why do we need to make a function for that? Couldn't we just get rid of update callback after mutation in PersonForm component? I don't understand
I checked, if I remove update callback after mutation in PersonForm component, and will use client.cache.updateQuery in useSubscription hook in the App component instead for updating query in a cache, then there will be no duplicates, everuthing is ok. 
So I repeat the question: why do we need bother about additional function for avoiding duplicates if it works without it?

Here is ChatGPT answer (not convincing):
While it may seem that removing the update callback after mutation in the PersonForm component and directly using client.cache.updateQuery in the App component works in your specific case, following the practice of encapsulating cache update logic in a separate function is a good habit to maintain a clean, scalable, and maintainable codebase, especially in larger and more complex applications. It helps avoid potential issues and makes your code more robust in the long run.