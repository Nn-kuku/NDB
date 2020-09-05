const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "테스트1";
const byeChannelName = "테스트2";
const welcomeChannelComment = "안녕하세요, 봇테스트 서버 입니다.";
const byeChannelComment = "안녕히가세요, 봇테스트 서버 였습니다.";

client.on('ready', () => {
  console.log('DSTest ON');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.login(token);

//DM공지 4강

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content.startsWith('전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

client.login(token);

//embed 5강

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '%도움말') {
    let img = 'https://cdn.discordapp.com/attachments/750611741754523660/751716865218183168/2d0c9d73e0aad1a9.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('NDS 봇')
      .setThumbnail(img)
      .addBlankField()
      .addField('안녕하세요', '테스트 봇입니다.')
      .addField('안녕하지만', '테스트 코드입니다.', true)
      .addField('안녕안해요', '테스트봇이 쓰는 코드 입니다.', true)
      .addField('이제 할말이 없다', '그러니 패스', true)
      .addField('마지막줄', '패스하고 싶지만\n그럴수는 없을거 같고\n그래도 패스\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Nn_kuku', img)

    message.channel.send(embed)
  } else if(message.content == '%도움말2') {
    let helpImg = 'https://cdn.discordapp.com/attachments/750611741754523660/751716865218183168/2d0c9d73e0aad1a9.jpg';
    let commandList = [
      {name: 'ping', desc: '쿠쿠루핑크퐁'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of Test BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`Nn_kuku Test BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }
});

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);

//