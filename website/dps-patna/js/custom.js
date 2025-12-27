document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.endsWith("circulars.php")) {
        const circularsContainer = document.getElementById('content');
        if (circularsContainer) {
            circularsContainer.innerHTML = ''; // Clear the content
            fetch('http://localhost:3001/api/circulars')
                .then(response => response.json())
                .then(data => {
                    let html = '<div class="row">';
                    data.forEach(circular => {
                        html += `
                            <div class="col-md-6 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${circular.title}</h5>
                                        <p class="card-text">${circular.date}</p>
                                        <a href="${circular.link}" class="btn btn-primary">Download</a>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    html += '</div>';
                    circularsContainer.innerHTML = html;
                })
                .catch(error => console.error('Error fetching circulars:', error));
        }
    } else if (window.location.pathname.endsWith("image-gallery.php")) {
        const galleryContainer = document.getElementById('content');
        if (galleryContainer) {
            galleryContainer.innerHTML = ''; // Clear the content
            fetch('http://localhost:3001/api/gallery')
                .then(response => response.json())
                .then(data => {
                    let html = '<div class="row">';
                    data.forEach(image => {
                        html += `
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <img src="${image.image}" class="card-img-top" alt="${image.title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${image.title}</h5>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    html += '</div>';
                    galleryContainer.innerHTML = html;
                })
                .catch(error => console.error('Error fetching gallery:', error));
        }
    } else if (window.location.pathname.endsWith("video-gallery.php")) {
        const videoGalleryContainer = document.getElementById('content');
        if (videoGalleryContainer) {
            videoGalleryContainer.innerHTML = ''; // Clear the content
            fetch('http://localhost:3001/api/videos')
                .then(response => response.json())
                .then(data => {
                    let html = '<div class="row">';
                    data.forEach(video => {
                        html += `
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${video.title}</h5>
                                        <div class="embed-responsive embed-responsive-16by9">
                                            <iframe class="embed-responsive-item" src="${video.video_url}" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    html += '</div>';
                    videoGalleryContainer.innerHTML = html;
                })
                .catch(error => console.error('Error fetching videos:', error));
        }
    }
});
