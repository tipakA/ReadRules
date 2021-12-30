/* eslint-disable sort-keys, no-inline-comments */
const constants = {
  ids: {
    gating: {
      emoji: {
        fail: ['✅'],
        pass: [ '💕', '💚' ],
      },
      guild: '335286472921841665',
      joinRole: '758926599952924723',
      rulesChannel: '768955020007571486',
      rulesMessage: '775235239269629962',
    },
    kicking: {
      safeRoles: [ // If ignoreOtherRoles is disabled, these roles will protect from kicking.
        '593188921421332480',
        '546465605398560770',
        '591155600650666005',
        '546430177706770455',
      ],
    },
    owner: '245867108582293504',
    userlogChannel: '595538665774776370',
  },
  reactions: {
    cooldown: 1500,
    autoRemove: true,
    autoReact: true,
  },
  kicking: {
    ignoreOtherRoles: false, // If disabled, bot will check other roles the member has before kicking them.
    kickTimeInHours: 48, // Time after which members that still have the role are to be kicked.
    batchSize: 25, // Limit of members to kick at once.
    delays: {
      kick: 500,
      batch: 10 * 60 * 1000, // 10 minutes between batches.
    },
  },
  prefix: 'rules+',
};

export default constants;