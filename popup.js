document.getElementById('collectData').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: collectData
        }, (results) => {
            const data = results[0].result;
            displayCollectedData(data);
        });
    });
});

document.getElementById('copyToClipboard').addEventListener('click', () => {
    const url = document.getElementById('urlField').value;
    const name = document.getElementById('nameField').value;
    const collections = document.getElementById('collectionsField').value;
    const followers = document.getElementById('followersField').value;
    const posts = document.getElementById('postsField').value;

    const tabSeparatedData = `${url}\t${name}\t${collections}\t${followers}\t${posts}`;

    navigator.clipboard.writeText(tabSeparatedData).then(() => {
        alert('Data copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

function collectData() {
    const url = window.location.href;
    const name = document.querySelector('.user-name')?.innerText || '';
    const followers = document.querySelectorAll('span.count')[1]?.innerText || '';
    const collections = document.querySelectorAll('span.count')[2]?.innerText || '';
    const posts = document.querySelectorAll('span.count')[0]?.innerText || '';

    return { url, name, followers, collections, posts };
}

function displayCollectedData(data) {
    document.getElementById('urlField').value = data.url;
    document.getElementById('nameField').value = data.name;
    document.getElementById('collectionsField').value = data.collections;
    document.getElementById('followersField').value = data.followers;
    document.getElementById('postsField').value = data.posts;
}
