import NodeCache from 'node-cache';

// Initialize cache with 12 hours (43200 seconds) TTL and a 1 hour check period
const cache = new NodeCache({ stdTTL: 43200, checkperiod: 3600 });

export default cache;
