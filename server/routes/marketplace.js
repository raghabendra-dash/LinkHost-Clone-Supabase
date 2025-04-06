import express from 'express';

const router = express.Router();

const websites = [
  {
    id: '1',
    url: 'example.com',
    metrics: {
      domainRating: 50,
      referringDomains: '5.3K',
      totalBacklinks: '33.1K',
      totalKeywords: '5.4K',
      spamScore: '4%',
      language: 'English',
      linkValidity: '1 Year',
      trafficByCountry: 'India'
    },
    price: 36
  },
  {
    id: '2',
    url: 'techblog.com',
    metrics: {
      domainRating: 65,
      referringDomains: '8.2K',
      totalBacklinks: '45.6K',
      totalKeywords: '12.1K',
      spamScore: '2%',
      language: 'English',
      linkValidity: '1 Year',
      trafficByCountry: 'USA'
    },
    price: 89
  }
];

router.get('/websites', (req, res) => {
 
  const filteredWebsites = websites.filter(website => {
    if (req.query.minDR && website.metrics.domainRating < parseInt(req.query.minDR)) {
      return false;
    }
    if (req.query.language && website.metrics.language !== req.query.language) {
      return false;
    }
    if (req.query.country && website.metrics.trafficByCountry !== req.query.country) {
      return false;
    }
    return true;
  });

  res.json(filteredWebsites);
});

router.get('/websites/:id', (req, res) => {
  const website = websites.find(w => w.id === req.params.id);
  if (!website) {
    return res.status(404).json({ message: 'Website not found' });
  }
  res.json(website);
});

export default router;