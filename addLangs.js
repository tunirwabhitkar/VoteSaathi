const fs = require('fs');
const path = require('path');

const transPath = path.join(__dirname, 'src', 'lib', 'translations.ts');
let transContent = fs.readFileSync(transPath, 'utf8');

transContent = transContent.replace(/export type Language = 'en' \| 'hi';/, "export type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta';");

const newTrans = `
  bn: {
    appName: 'VoteSaathi (ভোটসাথী)', appTagline: 'পেশাদার নির্বাচন পোর্টাল', navChat: 'সহকারী', navFlow: 'নির্বাচন প্রক্রিয়া', navEligibility: 'যোগ্যতা', navQuiz: 'কুইজ', navMap: 'ভোটকেন্দ্র',
    heroTitle: 'ভারতের নির্বাচন প্রক্রিয়া বুঝুন', heroSubtitle: 'ভোটদান এবং ভারতের গণতান্ত্রিক প্রক্রিয়া সম্পর্কে সহজ ভাষায় জানুন।', heroStartChat: 'চ্যাট শুরু করুন', heroCheckEligibility: 'যোগ্যতা যাচাই করুন',
    chatTitle: 'VoteSaathi Assistant', chatSubtitle: 'ভারতের নির্বাচন প্রক্রিয়া সম্পর্কে জিজ্ঞাসা করুন', chatPlaceholder: 'জিজ্ঞাসা করুন...', chatSend: 'পাঠান', chatEli5Mode: 'সহজ মোড', chatEli5Tooltip: 'শিশুর মতো করে বোঝান', chatClear: 'চ্যাট পরিষ্কার করুন', chatWelcome: 'নমস্কার! আমি নির্বাচন শিক্ষা সহকারী।', chatSuggestion1: 'কীভাবে নিবন্ধন করবেন?', chatSuggestion2: 'ভোট দেওয়ার যোগ্য কারা?', chatSuggestion3: 'ভোটের দিন কী হয়?', chatSuggestion4: 'ভোট কীভাবে গণনা করা হয়?',
    flowTitle: 'নির্বাচন প্রক্রিয়া', flowSubtitle: 'ভারতে নির্বাচন কীভাবে কাজ করে', flowStep1Title: 'ভোটার নিবন্ধন', flowStep1Desc: 'ভোটার তালিকায় নিবন্ধন করেন।', flowStep1Detail: 'আপনার বয়স ১৮+ হতে হবে।', flowStep2Title: 'নির্বাচন ঘোষণা', flowStep2Desc: 'নির্বাচন কমিশন সময়সূচী ঘোষণা করে।', flowStep2Detail: 'আদর্শ আচরণবিধি কার্যকর হয়।', flowStep3Title: 'প্রার্থী মনোনয়ন', flowStep3Desc: 'প্রার্থীরা মনোনয়নপত্র জমা দেন।', flowStep3Detail: 'প্রার্থীদের আমানত দিতে হবে।', flowStep4Title: 'প্রচারণা', flowStep4Desc: 'প্রার্থীরা প্রচার চালান।', flowStep4Detail: 'ভোটদান শুরু হওয়ার ৪৮ ঘণ্টা আগে প্রচারণা বন্ধ করতে হবে।', flowStep5Title: 'ভোটের দিন', flowStep5Desc: 'ভোটাররা EVM-এ ভোট দেন।', flowStep5Detail: 'ভোট সাধারণত সকাল ৭টা থেকে সন্ধ্যা ৬টা পর্যন্ত হয়।', flowStep6Title: 'ভোট গণনা', flowStep6Desc: 'ভোট গণনা করা হয়।', flowStep6Detail: 'ফলাফল ঘোষণা করা হয়।',
    eligibilityTitle: 'যোগ্যতা পরীক্ষা করুন', eligibilitySubtitle: 'আপনি ভোট দিতে পারবেন কি না', eligibilityAge: 'আপনার বয়স', eligibilityAgePlaceholder: 'বয়স লিখুন', eligibilityCitizenship: 'আপনি কি ভারতীয় নাগরিক?', eligibilityYes: 'হ্যাঁ', eligibilityNo: 'না', eligibilityLocation: 'আপনার রাজ্য', eligibilityLocationPlaceholder: 'রাজ্য নির্বাচন করুন', eligibilityCheck: 'যাচাই করুন', eligibilityEligible: 'আপনি ভোট দেওয়ার যোগ্য! 🎉', eligibilityNotEligible: 'আপনি যোগ্য নন', eligibilityReason: 'কারণ', eligibilityNextSteps: 'পরবর্তী পদক্ষেপ',
    quizTitle: 'জ্ঞান পরীক্ষা করুন', quizSubtitle: 'আপনি নির্বাচন প্রক্রিয়া কতটা জানেন?', quizStart: 'শুরু করুন', quizNext: 'পরবর্তী', quizSubmit: 'জমা দিন', quizRestart: 'আবার চেষ্টা করুন', quizScore: 'আপনার স্কোর', quizCorrect: 'সঠিক!', quizIncorrect: 'ভুল!', quizQuestion: 'প্রশ্ন', quizOf: 'এর মধ্যে', quizExcellent: 'দুর্দান্ত!', quizGood: 'ভালো কাজ!', quizFair: 'ন্যায্য প্রচেষ্টা!', quizNeedsWork: 'পড়তে থাকুন!',
    mapTitle: 'নিকটতম ভোটকেন্দ্র খুঁজুন', mapSubtitle: 'ভোটকেন্দ্র সনাক্ত করুন', mapSearch: 'খুঁজুন', mapSearchBtn: 'অনুসন্ধান', mapNote: 'মক ডেটা দেখানো হচ্ছে।',
    footerRights: '© ২০২৪ VoteSaathi', footerDisclaimer: 'এটি একটি শিক্ষামূলক হাতিয়ার।'
  },
  te: {
    appName: 'VoteSaathi (ఓట్ సాతీ)', appTagline: 'ప్రొఫెషనల్ ఎలక్షన్ పోర్టల్', navChat: 'సహాయకుడు', navFlow: 'ఎన్నికల ప్రక్రియ', navEligibility: 'అర్హత', navQuiz: 'క్విజ్', navMap: 'పోలింగ్ కేంద్రాలు',
    heroTitle: 'భారతదేశ ఎన్నికల ప్రక్రియను అర్థం చేసుకోండి', heroSubtitle: 'ఎన్నికల గురించి సులభంగా తెలుసుకోండి.', heroStartChat: 'చాట్ ప్రారంభించండి', heroCheckEligibility: 'అర్హతను తనిఖీ చేయండి',
    chatTitle: 'VoteSaathi Assistant', chatSubtitle: 'ఎన్నికల గురించి ఏదైనా అడగండి', chatPlaceholder: 'అడగండి...', chatSend: 'పంపండి', chatEli5Mode: 'సులభమైన మోడ్', chatEli5Tooltip: 'పిల్లలకు చెప్పినట్టు', chatClear: 'చాట్ క్లియర్ చేయండి', chatWelcome: 'నమస్కారం! నేను మీ ఎన్నికల సహాయకుడిని.', chatSuggestion1: 'ఎలా నమోదు చేసుకోవాలి?', chatSuggestion2: 'ఓటు వేయడానికి అర్హులు ఎవరు?', chatSuggestion3: 'పోలింగ్ రోజు ఏం జరుగుతుంది?', chatSuggestion4: 'ఓట్లను ఎలా లెక్కిస్తారు?',
    flowTitle: 'ఎన్నికల ప్రక్రియ', flowSubtitle: 'ఎన్నికలు ఎలా జరుగుతాయి', flowStep1Title: 'ఓటరు నమోదు', flowStep1Desc: 'ఓటరు జాబితాలో నమోదు.', flowStep1Detail: 'వయస్సు 18+ ఉండాలి.', flowStep2Title: 'ఎన్నికల ప్రకటన', flowStep2Desc: 'ఎన్నికల సంఘం ప్రకటిస్తుంది.', flowStep2Detail: 'ప్రవర్తనా నియమావళి వర్తిస్తుంది.', flowStep3Title: 'నామినేషన్', flowStep3Desc: 'అభ్యర్థులు నామినేషన్ వేస్తారు.', flowStep3Detail: 'డిపాజిట్ చెల్లించాలి.', flowStep4Title: 'ప్రచారం', flowStep4Desc: 'అభ్యర్థులు ప్రచారం చేస్తారు.', flowStep4Detail: '48 గంటల ముందు ప్రచారం ఆపాలి.', flowStep5Title: 'పోలింగ్ రోజు', flowStep5Desc: 'ఓటర్లు EVM లో ఓటు వేస్తారు.', flowStep5Detail: 'ఉదయం 7 నుండి సాయంత్రం 6 వరకు.', flowStep6Title: 'లెక్కింపు', flowStep6Desc: 'ఓట్ల లెక్కింపు.', flowStep6Detail: 'ఫలితాల ప్రకటన.',
    eligibilityTitle: 'మీ అర్హతను తనిఖీ చేయండి', eligibilitySubtitle: 'ఓటు వేయగలరో లేదో తెలుసుకోండి', eligibilityAge: 'మీ వయస్సు', eligibilityAgePlaceholder: 'వయస్సు నమోదు చేయండి', eligibilityCitizenship: 'మీరు భారతీయ పౌరులా?', eligibilityYes: 'అవును', eligibilityNo: 'కాదు', eligibilityLocation: 'మీ రాష్ట్రం', eligibilityLocationPlaceholder: 'రాష్ట్రాన్ని ఎంచుకోండి', eligibilityCheck: 'తనిఖీ చేయండి', eligibilityEligible: 'మీరు అర్హులు! 🎉', eligibilityNotEligible: 'మీరు అర్హులు కారు', eligibilityReason: 'కారణం', eligibilityNextSteps: 'తదుపరి దశలు',
    quizTitle: 'జ్ఞానాన్ని పరీక్షించుకోండి', quizSubtitle: 'ఎన్నికల గురించి ఎంత తెలుసు?', quizStart: 'ప్రారంభించండి', quizNext: 'తదుపరి', quizSubmit: 'సమర్పించండి', quizRestart: 'మళ్ళీ ప్రయత్నించండి', quizScore: 'స్కోర్', quizCorrect: 'సరైనది!', quizIncorrect: 'తప్పు!', quizQuestion: 'ప్రశ్న', quizOf: 'లో', quizExcellent: 'అద్భుతం!', quizGood: 'మంచి పని!', quizFair: 'ఫర్వాలేదు!', quizNeedsWork: 'చదువుతూ ఉండండి!',
    mapTitle: 'పోలింగ్ కేంద్రాన్ని కనుగొనండి', mapSubtitle: 'కేంద్రాన్ని గుర్తించండి', mapSearch: 'వెతకండి', mapSearchBtn: 'శోధించు', mapNote: 'మాక్ డేటా చూపిస్తున్నాము.',
    footerRights: '© 2024 VoteSaathi', footerDisclaimer: 'ఇది విద్యా ప్రయోజనాల కోసం.'
  },
  mr: {
    appName: 'VoteSaathi (वोटसाथी)', appTagline: 'व्यावसायिक निवडणूक पोर्टल', navChat: 'सहाय्यक', navFlow: 'निवडणूक प्रक्रिया', navEligibility: 'पात्रता', navQuiz: 'क्विझ', navMap: 'मतदान केंद्रे',
    heroTitle: 'भारताची निवडणूक प्रक्रिया समजून घ्या', heroSubtitle: 'निवडणुकीबद्दल सोप्या भाषेत जाणून घ्या.', heroStartChat: 'चॅट सुरू करा', heroCheckEligibility: 'पात्रता तपासा',
    chatTitle: 'VoteSaathi Assistant', chatSubtitle: 'निवडणुकीबद्दल काहीही विचारा', chatPlaceholder: 'विचारा...', chatSend: 'पाठवा', chatEli5Mode: 'सोपी पद्धत', chatEli5Tooltip: 'मुलांसारखे समजावून सांगा', chatClear: 'चॅट साफ करा', chatWelcome: 'नमस्कार! मी तुमचा निवडणूक सहाय्यक आहे.', chatSuggestion1: 'नोंदणी कशी करावी?', chatSuggestion2: 'मतदानासाठी कोण पात्र आहे?', chatSuggestion3: 'मतदानाच्या दिवशी काय होते?', chatSuggestion4: 'मोजणी कशी होते?',
    flowTitle: 'निवडणूक प्रक्रिया', flowSubtitle: 'निवडणूक कशी चालते', flowStep1Title: 'मतदार नोंदणी', flowStep1Desc: 'मतदार यादीत नोंदणी.', flowStep1Detail: 'वय १८+ असणे आवश्यक आहे.', flowStep2Title: 'निवडणुकीची घोषणा', flowStep2Desc: 'आयोग घोषणा करतो.', flowStep2Detail: 'आचारसंहिता लागू होते.', flowStep3Title: 'उमेदवारी', flowStep3Desc: 'उमेदवार अर्ज भरतात.', flowStep3Detail: 'ठेव भरावी लागते.', flowStep4Title: 'प्रचार', flowStep4Desc: 'उमेदवार प्रचार करतात.', flowStep4Detail: '४८ तास आधी प्रचार थांबवावा लागतो.', flowStep5Title: 'मतदानाचा दिवस', flowStep5Desc: 'EVM वर मतदान.', flowStep5Detail: 'सकाळी ७ ते संध्याकाळी ६.', flowStep6Title: 'मोजणी', flowStep6Desc: 'मतांची मोजणी.', flowStep6Detail: 'निकालाची घोषणा.',
    eligibilityTitle: 'तुमची पात्रता तपासा', eligibilitySubtitle: 'मतदान करू शकता की नाही ते जाणून घ्या', eligibilityAge: 'तुमचे वय', eligibilityAgePlaceholder: 'वय प्रविष्ट करा', eligibilityCitizenship: 'तुम्ही भारतीय नागरिक आहात का?', eligibilityYes: 'होय', eligibilityNo: 'नाही', eligibilityLocation: 'तुमचे राज्य', eligibilityLocationPlaceholder: 'राज्य निवडा', eligibilityCheck: 'तपासा', eligibilityEligible: 'तुम्ही पात्र आहात! 🎉', eligibilityNotEligible: 'तुम्ही पात्र नाही', eligibilityReason: 'कारण', eligibilityNextSteps: 'पुढील पायऱ्या',
    quizTitle: 'ज्ञानाची चाचणी घ्या', quizSubtitle: 'निवडणुकीबद्दल किती माहिती आहे?', quizStart: 'सुरू करा', quizNext: 'पुढील', quizSubmit: 'जमा करा', quizRestart: 'पुन्हा प्रयत्न करा', quizScore: 'स्कोर', quizCorrect: 'बरोबर!', quizIncorrect: 'चूक!', quizQuestion: 'प्रश्न', quizOf: 'पैकी', quizExcellent: 'उत्कृष्ट!', quizGood: 'छान!', quizFair: 'ठीक आहे!', quizNeedsWork: 'वाचत रहा!',
    mapTitle: 'मतदान केंद्र शोधा', mapSubtitle: 'केंद्र शोधा', mapSearch: 'शोधा', mapSearchBtn: 'शोधा', mapNote: 'मॉक डेटा दर्शविला जात आहे.',
    footerRights: '© 2024 VoteSaathi', footerDisclaimer: 'हे शैक्षणिक हेतूसाठी आहे.'
  },
  ta: {
    appName: 'VoteSaathi (வாக்குசாத்தி)', appTagline: 'தொழில்முறை தேர்தல் போர்டல்', navChat: 'உதவியாளர்', navFlow: 'தேர்தல் செயல்முறை', navEligibility: 'தகுதி', navQuiz: 'வினாடி வினா', navMap: 'வாக்குச் சாவடிகள்',
    heroTitle: 'இந்தியாவின் தேர்தல் செயல்முறையை புரிந்து கொள்ளுங்கள்', heroSubtitle: 'தேர்தல் பற்றி எளிய முறையில் அறியவும்.', heroStartChat: 'உரையாடலைத் தொடங்கு', heroCheckEligibility: 'தகுதியைச் சரிபார்க்கவும்',
    chatTitle: 'VoteSaathi Assistant', chatSubtitle: 'தேர்தல் பற்றி ஏதேனும் கேளுங்கள்', chatPlaceholder: 'கேளுங்கள்...', chatSend: 'அனுப்பு', chatEli5Mode: 'எளிய முறை', chatEli5Tooltip: 'குழந்தைகளுக்கு சொல்வது போல', chatClear: 'உரையாடலை அழி', chatWelcome: 'வணக்கம்! நான் உங்கள் தேர்தல் உதவியாளர்.', chatSuggestion1: 'பதிவு செய்வது எப்படி?', chatSuggestion2: 'வாக்களிக்க தகுதியானவர் யார்?', chatSuggestion3: 'வாக்குப்பதிவு நாளில் என்ன நடக்கும்?', chatSuggestion4: 'வாக்குகள் எப்படி எண்ணப்படுகின்றன?',
    flowTitle: 'தேர்தல் செயல்முறை', flowSubtitle: 'தேர்தல் எப்படி நடக்கிறது', flowStep1Title: 'வாக்காளர் பதிவு', flowStep1Desc: 'வாக்காளர் பட்டியலில் பதிவு.', flowStep1Detail: 'வயது 18+ ஆக இருக்க வேண்டும்.', flowStep2Title: 'தேர்தல் அறிவிப்பு', flowStep2Desc: 'தேர்தல் ஆணையம் அறிவிக்கிறது.', flowStep2Detail: 'நன்னடத்தை விதிகள் அமலுக்கு வரும்.', flowStep3Title: 'வேட்புமனு', flowStep3Desc: 'வேட்பாளர்கள் வேட்புமனு தாக்கல்.', flowStep3Detail: 'வைப்புத் தொகை செலுத்த வேண்டும்.', flowStep4Title: 'பிரச்சாரம்', flowStep4Desc: 'வேட்பாளர்கள் பிரச்சாரம் செய்கிறார்கள்.', flowStep4Detail: '48 மணி நேரத்திற்கு முன் பிரச்சாரத்தை நிறுத்த வேண்டும்.', flowStep5Title: 'வாக்குப்பதிவு நாள்', flowStep5Desc: 'EVM இல் வாக்குப்பதிவு.', flowStep5Detail: 'காலை 7 முதல் மாலை 6 வரை.', flowStep6Title: 'எண்ணிக்கை', flowStep6Desc: 'வாக்கு எண்ணிக்கை.', flowStep6Detail: 'முடிவுகள் அறிவிப்பு.',
    eligibilityTitle: 'தகுதியைச் சரிபார்க்கவும்', eligibilitySubtitle: 'வாக்களிக்க முடியுமா என்பதை அறியவும்', eligibilityAge: 'உங்கள் வயது', eligibilityAgePlaceholder: 'வயதை உள்ளிடவும்', eligibilityCitizenship: 'நீங்கள் இந்திய குடிமகனா?', eligibilityYes: 'ஆம்', eligibilityNo: 'இல்லை', eligibilityLocation: 'உங்கள் மாநிலம்', eligibilityLocationPlaceholder: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்', eligibilityCheck: 'சரிபார்க்கவும்', eligibilityEligible: 'நீங்கள் தகுதியானவர்! 🎉', eligibilityNotEligible: 'நீங்கள் தகுதியற்றவர்', eligibilityReason: 'காரணம்', eligibilityNextSteps: 'அடுத்த படிகள்',
    quizTitle: 'அறிவை சோதிக்கவும்', quizSubtitle: 'தேர்தல் பற்றி எவ்வளவு தெரியும்?', quizStart: 'தொடங்கு', quizNext: 'அடுத்த', quizSubmit: 'சமர்ப்பி', quizRestart: 'மீண்டும் முயற்சிக்கவும்', quizScore: 'மதிப்பெண்', quizCorrect: 'சரியானது!', quizIncorrect: 'தவறு!', quizQuestion: 'கேள்வி', quizOf: 'இல்', quizExcellent: 'அருமை!', quizGood: 'நல்லது!', quizFair: 'பரவாயில்லை!', quizNeedsWork: 'படித்துக்கொண்டே இருங்கள்!',
    mapTitle: 'வாக்குச் சாவடியைக் கண்டறியவும்', mapSubtitle: 'சாவடியைக் கண்டறியவும்', mapSearch: 'தேடு', mapSearchBtn: 'தேடு', mapNote: 'மாதிரி தரவு காட்டப்படுகிறது.',
    footerRights: '© 2024 VoteSaathi', footerDisclaimer: 'இது கல்வி நோக்கங்களுக்காக.'
  }
};`;

transContent = transContent.replace(/};\s*$/, newTrans + '\n};\n');
fs.writeFileSync(transPath, transContent, 'utf8');

const dataPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const newQuiz = `
  bn: [
    { id: 1, question: 'ভারতে ভোট দেওয়ার ন্যূনতম বয়স কত?', options: ['১৬ বছর', '১৮ বছর', '২১ বছর', '২৫ বছর'], correct: 1, explanation: 'ভারতে ন্যূনতম ভোটের বয়স ১৮ বছর।' },
    { id: 2, question: 'ভারতে নির্বাচন পরিচালনা করে কে?', options: ['সুপ্রিম কোর্ট', 'সংসদ', 'ভারতের নির্বাচন কমিশন', 'রাষ্ট্রপতি'], correct: 2, explanation: 'নির্বাচন কমিশন নির্বাচন পরিচালনা করে।' },
    { id: 3, question: 'EVM এর পূর্ণরূপ কী?', options: ['ইলেকট্রনিক ভোটিং মেশিন', 'ইলেকশন ভেরিফিকেশন মেথড', 'ইলেক্টোরাল ভোট মনিটর', 'ইলেকট্রনিক ভোট ম্যানেজমেন্ট'], correct: 0, explanation: 'EVM মানে ইলেকট্রনিক ভোটিং মেশিন।' },
    { id: 4, question: 'লোকসভার মেয়াদ কত বছর?', options: ['৩ বছর', '৪ বছর', '৫ বছর', '৬ বছর'], correct: 2, explanation: 'লোকসভার মেয়াদ ৫ বছর।' },
    { id: 5, question: 'ভোটের আগে "সাইলেন্স পিরিয়ড" কী?', options: ['২৪ ঘণ্টা আগে', '৪৮ ঘণ্টা আগে', '৭২ ঘণ্টা আগে', '১ সপ্তাহ আগে'], correct: 1, explanation: 'ভোটের ৪৮ ঘণ্টা আগে প্রচার বন্ধ থাকে।' }
  ],
  te: [
    { id: 1, question: 'భారతదేశంలో ఓటు వేయడానికి కనీస వయస్సు ఎంత?', options: ['16 సంవత్సరాలు', '18 సంవత్సరాలు', '21 సంవత్సరాలు', '25 సంవత్సరాలు'], correct: 1, explanation: 'కనీస వయస్సు 18 సంవత్సరాలు.' },
    { id: 2, question: 'ఎన్నికలను ఎవరు నిర్వహిస్తారు?', options: ['సుప్రీంకోర్టు', 'పార్లమెంటు', 'ఎన్నికల సంఘం', 'రాష్ట్రపతి'], correct: 2, explanation: 'ఎన్నికల సంఘం నిర్వహిస్తుంది.' },
    { id: 3, question: 'EVM అంటే ఏమిటి?', options: ['ఎలక్ట్రానిక్ ఓటింగ్ మెషిన్', 'ఎలక్షన్ వెరిఫికేషన్ మెథడ్', 'ఎలక్టోరల్ ఓట్ మానిటర్', 'ఎలక్ట్రానిక్ ఓట్ మేనేజ్మెంట్'], correct: 0, explanation: 'EVM అంటే ఎలక్ట్రానిక్ ఓటింగ్ మెషిన్.' },
    { id: 4, question: 'లోక్‌సభ పదవీకాలం ఎంత?', options: ['3 ఏళ్లు', '4 ఏళ్లు', '5 ఏళ్లు', '6 ఏళ్లు'], correct: 2, explanation: 'పదవీకాలం 5 ఏళ్లు.' },
    { id: 5, question: 'పోలింగ్‌కు ముందు "సైలెన్స్ పీరియడ్" ఏమిటి?', options: ['24 గంటల ముందు', '48 గంటల ముందు', '72 గంటల ముందు', '1 వారం ముందు'], correct: 1, explanation: '48 గంటల ముందు ప్రచారం ఆపాలి.' }
  ],
  mr: [
    { id: 1, question: 'भारतात मतदानाचे किमान वय किती?', options: ['१६ वर्षे', '१८ वर्षे', '२१ वर्षे', '२५ वर्षे'], correct: 1, explanation: 'किमान वय १८ वर्षे आहे.' },
    { id: 2, question: 'निवडणूक कोण घेते?', options: ['सर्वोच्च न्यायालय', 'संसद', 'निवडणूक आयोग', 'राष्ट्रपती'], correct: 2, explanation: 'निवडणूक आयोग निवडणूक घेतो.' },
    { id: 3, question: 'EVM म्हणजे काय?', options: ['इलेक्ट्रॉनिक वोटिंग मशीन', 'इलेक्शन व्हेरिफिकेशन मेथड', 'इलेक्टोरल वोट मॉनिटर', 'इलेक्ट्रॉनिक वोट मॅनेजमेंट'], correct: 0, explanation: 'EVM म्हणजे इलेक्ट्रॉनिक वोटिंग मशीन.' },
    { id: 4, question: 'लोकसभेचा कार्यकाळ किती?', options: ['३ वर्षे', '४ वर्षे', '५ वर्षे', '६ वर्षे'], correct: 2, explanation: 'कार्यकाळ ५ वर्षे असतो.' },
    { id: 5, question: 'मतदानापूर्वी "सायलेन्स पिरियड" काय आहे?', options: ['२४ तास आधी', '४८ तास आधी', '७२ तास आधी', '१ आठवडा आधी'], correct: 1, explanation: '४८ तास आधी प्रचार थांबतो.' }
  ],
  ta: [
    { id: 1, question: 'இந்தியாவில் வாக்களிக்க குறைந்தபட்ச வயது என்ன?', options: ['16 ஆண்டுகள்', '18 ஆண்டுகள்', '21 ஆண்டுகள்', '25 ஆண்டுகள்'], correct: 1, explanation: 'குறைந்தபட்ச வயது 18 ஆண்டுகள்.' },
    { id: 2, question: 'தேர்தலை நடத்துவது யார்?', options: ['உச்ச நீதிமன்றம்', 'நாடாளுமன்றம்', 'தேர்தல் ஆணையம்', 'குடியரசுத் தலைவர்'], correct: 2, explanation: 'தேர்தல் ஆணையம் நடத்துகிறது.' },
    { id: 3, question: 'EVM என்றால் என்ன?', options: ['எலக்ட்ரானிக் வோட்டிங் மெஷின்', 'எலக்‌ஷன் வெரிஃபிகேஷன் மெத்தட்', 'எலக்டோரல் வோட் மானிட்டர்', 'எலக்ட்ரானிக் வோட் மேனேஜ்மென்ட்'], correct: 0, explanation: 'EVM என்பது எலக்ட்ரானிக் வோட்டிங் மெஷின்.' },
    { id: 4, question: 'மக்களவையின் பதவிக்காலம் என்ன?', options: ['3 ஆண்டுகள்', '4 ஆண்டுகள்', '5 ஆண்டுகள்', '6 ஆண்டுகள்'], correct: 2, explanation: 'பதவிக்காலம் 5 ஆண்டுகள்.' },
    { id: 5, question: 'வாக்குப்பதிவுக்கு முன் "சைலன்ஸ் பீரியட்" என்றால் என்ன?', options: ['24 மணி நேரம் முன்', '48 மணி நேரம் முன்', '72 மணி நேரம் முன்', '1 வாரம் முன்'], correct: 1, explanation: '48 மணி நேரத்திற்கு முன் பிரச்சாரம் நிற்கிறது.' }
  ]
};`;

dataContent = dataContent.replace(/};\s*\/\/\s*Indian states for eligibility checker/, newQuiz + '\n\n// Indian states for eligibility checker');
fs.writeFileSync(dataPath, dataContent, 'utf8');

console.log("Languages added successfully!");
