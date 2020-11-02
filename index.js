const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕하세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '"렌트야"라고 적어보세요!' }, status: 'online' })
});

client.on("guildmemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "빛나는 조각"));
});

client.on("guildmemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '인트') {
    return message.reply('구독해주세요.');
  }

  if(message.content == '렌트야') {
    return message.reply('네 무엇을 도와드릴까요?');
  }

 if(message.content == '렌트야 도움말') {
    return message.reply('렌트야, ping, embed2, !전체공지, !청소와 같은 명령어가 있습니다! 자신의 권한이 이 명령어를 사용할 수 있는 등급인지 알아 보시고 사용해 주세요!');
  }

  if(message.content == '렌트야 내 이름') {
    return message.reply( `<@${message.author.id}>` + "맞으시죠?");
  }

  if(message.content == '렌트야 바보') {
    return message.reply('응 아니야 자기소개 하지 마요,' + `<@${message.author.id}>`+ "바보~");
  }

  if(message.content == '렌트야 권혁준') {
    return message.reply("다크맨");
  }

  if(message.content == '렌트야 계란말이다') {
    return message.reply("이스터에그 1 계란을 까서 휘저은 후 프라이팬에 올려 구운후 돌돌말아서 먹는다.");
  }

  if(message.content == '렌트야 박승원') {
    return message.reply("엑셀렌트의 본명.");
  }

  if(message.content == '렌트야 엑셀렌트') {
    return message.reply("콜오브듀티의 닉네임이다. 프로필은 콜오브 듀티 전설 랭크");
  }

  if(message.content == '렌트야 엑셀렌트 봇') {
    return message.reply("엑셀렌트가 만든 봇. 거의 모든 것이 똑같다.");
  }

  if(message.content == '렌트야 프로그램') {
    return message.reply("1번째 업데이트 기준으로 총 208개의 줄로 이루어진 node.js 명령어로 만들어 졌다.");
  }
  
  if(message.content == '렌트야 안녕') {
    return message.reply("안녕하세요!");
  }

  if(message.content == '애향') {
    return message.reply('바부 멍청이~');
  }

 if(message.content == 'embed') {
    let img = 'https://media.discordapp.net/attachments/757747891312918618/757753105088643142/5.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('정보')
      .setURL('http://www.naver.com')
      .setAuthor('우산 아님 엑셀렌트', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('Inline field title', '잘생김')
      .addField('Inline field title', '봇 3트', true)
      .addField('Inline field title', '공부잘함', true)
      .addField('Inline field title', '목표 서울대 의대 가기', true)
      .addField('Inline field title', '재밌는 인생(?)\n행복하면 좋은 인생(?)\n맞아 쓸거 없어서 이딴거 쓰는 중\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('엑셀렌트가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == 'help') {
    let helpImg = 'https://media.discordapp.net/attachments/757747891312918618/757753105088643142/5.jpg';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
      {name: '!청소', desc: '텍스트 지움'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 엑셀렌트 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`엑셀렌트 봇`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }

  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
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

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);