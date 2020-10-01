# 0.3.0

- Removed `messageCacheLifetime` and `messageSweepInterval` client options
  - Those were causing removal of rules message from cache, causing no `messageReactionAdd` events being emitted.

# 0.2.0

- Properly ignore reactions on messages that are not the rules
- Properly ignore reactions that are not using specified emoji

# 0.1.0

Initial version