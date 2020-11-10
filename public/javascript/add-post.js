async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_url = document.querySelector('select[name="post-url"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/newOrder');
    alert('New order created!');
  } else {
    alert('Order was not created. Error: ' + response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
