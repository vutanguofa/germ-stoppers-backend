async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_url = document.querySelector('select[name="post-url"]').value;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/salesHistory');
    alert('Order has been updated!');
  } else {
    alert('Order was not updated. ' + response.statusText);
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
