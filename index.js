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

  if(message.content == '미사용') {
    let img = 'https://cdn.discordapp.com/attachments/750611741754523660/751716865218183168/2d0c9d73e0aad1a9.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('NDS 봇')
      .setThumbnail(img)
      .addBlankField()
      .addField('미사용', '미사용')
      .addField('미사용', '미사용', true)
      .addField('미사용', '미사용', true)
      .addField('미사용', '미사용', true)
      .addField('마미사용', '미사용\n미사용\n미사용\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Nn_kuku', img)

    message.channel.send(embed)
  } else if(message.content == '도움말') {
    let helpImg = 'https://cdn.discordapp.com/attachments/750611741754523660/751716865218183168/2d0c9d73e0aad1a9.jpg';
    let commandList = [
      {name: '도움말', desc: '사용 가능한 명령어 목록'},
      {name: 'help', desc: '감자 명령어'},
      {name: '전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Test Bot', helpImg)
      .setColor('#186de6')
      .setFooter(`Nn_Ab Test BOT`)
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

//내꺼

client.on('message', (message) => {
  if (message.content === 'help') {
  message.channel.send('디코, 제작자');
  }
});

client.login(token);

client.on('message', (message) => {
  if (message.content === '디코') {
  message.channel.send('Nn_Ab#4251');
  }
});

client.login(token);

client.on('message', (message) => {
  if (message.content === '제작자') {
  message.channel.send('Ab(에이비)');
  }
});

client.login(token);