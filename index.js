const main = async () => {
  const scrape = (await import('website-scraper')).default;
  const options = {
    urls: ['https://www.dpspatna.com/'],
    directory: 'website/dps-patna',
    recursive: true,
    maxRecursiveDepth: 5,
    urlFilter: (url) => {
      return url.startsWith('https://www.dpspatna.com/');
    },
    onResourceSaved: (resource) => {
      console.log(`Resource ${resource.url} saved to ${resource.filename}`);
    },
    onResourceError: (resource, err) => {
      console.log(`Resource ${resource.url} failed to download: ${err}`);
    }
  };

  try {
    const result = await scrape(options);
    console.log('Website succesfully downloaded');
  } catch (err) {
    console.log('An error ocurred', err);
  }
};

main();