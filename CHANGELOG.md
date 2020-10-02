# 0.5.0

- Added more time formats, since `0.0 hours` isn't very descriptive.

# 0.4.0

- Added time counting between someone joining and verifying.

# 0.3.0

- Removed `messageCacheLifetime` and `messageSweepInterval` client options
  - Those were causing removal of rules message from cache, causing no `messageReactionAdd` events being emitted.

# 0.2.0

- Properly ignore reactions on messages that are not the rules
- Properly ignore reactions that are not using specified emoji

# 0.1.0

Initial version