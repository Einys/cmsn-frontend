"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reply = {
    welcome_message: {
        "text": "반갑습니다, 어떤 일로 찾아오셨나요? 이 인사와 선택창을 다시 띄우고 싶으시면 아무 때나 '첫인사' 라고 말하면 됩니다. ",
        "quick_reply": {
            "type": "options",
            "options": [
                {
                    "label": "💀 가이드라인 위반 이용 신고",
                    "description": "열심히 도는 봇이 오남용되다니",
                    "metadata": "external_id_1"
                },
                {
                    "label": "🤔 신기하다",
                    "description": "이게뭐지",
                    "metadata": "external_id_2"
                },
                {
                    "label": "☕ 커피 사준다 (♥!!)",
                    "description": "따끈따끈한 부스트",
                    "metadata": "external_id_3"
                },
                {
                    "label": "❔ 도움말",
                    "description": "자동봇 이용에 관한 안내",
                    "metadata": "external_id_4"
                },
                {
                    "label": "💌 건의사항",
                    "description": "건의함 (홍보 요청은 멘션으로)",
                    "metadata": "external_id_5"
                }
            ]
        }
    },
    main_2_ququ: {
        "text": "'ω') 반갑습니다..? 어떤 일로 찾아오셨나요..? ",
        "quick_reply": {
            "type": "options",
            "options": [
                {
                    "label": "쓰담쓰담",
                    "description": "헤에",
                    "metadata": "pat"
                }
            ]
        }
    },
    main_3_coffee: {
        "text": "('ω' ⊃)('ω' ⊃)('ω' ⊃) https://ko-fi.com/cmsnRT 여기에요! 정말 감사합니다!",
    },
    main_4_help: { "text": " *   ('ω' ⊃)('ω' ⊃)('ω' ⊃) · . https://www.cm-sn.art/help 내용을 살펴봐주세요." },
    main_5_suggest: {
        "text": " 'ω') 내용을 말씀해주세요. DM 처리 내역이 많으면 확인이 어려우니 @cmsn_ADMIN 에 멘션하시거나 cmsn.service@gmail.com 으로 내용을 보내실 수도 있습니다. 감사합니다. ",
    },
    report_choice: {
        "text": null,
        "quick_reply": {
            "type": "options",
            "options": [
                {
                    "label": "모욕적",
                    "description": "타인을 모욕, 상처주거나 놀리고 있습니다.",
                    "metadata": "abuse_rude"
                },
                {
                    "label": "이미지 도용",
                    "description": "이미지를 도용 또는 트레이싱(덧대고 옮겨 그림)했습니다.",
                    "metadata": "abuse_copyright"
                },
                {
                    "label": "포르노 커미션",
                    "description": "포르노(음란,폭력) 커미션입니다. 또는 그러한 이미지를 게시중입니다",
                    "metadata": "abuse_porn"
                },
                {
                    "label": "스팸",
                    "description": "봇 취지와 전혀 무관하고 부적절한 내용입니다",
                    "metadata": "abuse_spam"
                },
                {
                    "label": "잘못된 요청",
                    "description": "봇 선택을 잘못했거나, 요청 방법이 잘못되었습니다.",
                    "metadata": "abuse_misuse"
                },
                {
                    "label": "잦은 요청",
                    "description": "봇에게 홍보 요청을 너무 자주 합니다.",
                    "metadata": "abuse_toomuch"
                },
                {
                    "label": "돌아가기",
                    "description": "신고를 취소하고 돌아가기",
                    "metadata": "cancel"
                }
            ]
        }
    }
};
//# sourceMappingURL=dmReply.js.map