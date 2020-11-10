# Changelog

### 0.7.1

- Moved reaction removal code above checks for recent reaction
  - Fixes not removing spammed reactions.

### 0.7.0

- Added option for automatic reaction removal, to avoid polluting reaction counts.
- Added option for automatic reactions on new rule messages.

### 0.6.3

- Added a recent reaction tracking
  - Should avoid errors from fetching already kicked members, happening when user quickly reacts with multiple reactions.

### 0.6.2

- Added version getter to main class.

### 0.6.1

- Reordered returns in `messageReactionAdd` event to avoid unnecessary running.
- Added kick skipping
  - Avoids errors with permission check.
  - Skips members with `MANAGE_GUILD` and bot owner.

### 0.6.0

- Added failure reaction feature
  - Bot kicks if someone reacts with incorrect emote. Works best when set up as a bait for quick glances.

### 0.5.1

- Small code fix.

### 0.5.0

- Added more time formats, since `0.0 hours` isn't very descriptive.

### 0.4.0

- Added time counting between someone joining and verifying.

### 0.3.0

- Removed `messageCacheLifetime` and `messageSweepInterval` client options
  - Those were causing removal of rules message from cache, causing no `messageReactionAdd` events being emitted.

### 0.2.0

- Properly ignore reactions on messages that are not the rules.
- Properly ignore reactions that are not using specified emoji.

### 0.1.0

Initial version