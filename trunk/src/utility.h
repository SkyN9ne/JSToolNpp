#ifndef _UTILITY_H_
#define _UTILITY_H_

#include <string>
#include "strhelper.h"

using namespace std;
using namespace sunjwbase;

const int EOL_LF = 0; // \n
const int EOL_CRLF = 1; // \r\n
const int EOL_AUTO = 3;
const char INDENT_TAB = '\t';
const char INDENT_SPACE = ' ';
const string OPT_INDENT_TAB = string("tab");
const string OPT_INDENT_SPACE = string("space");

struct StruOptions
{
	int nPutCR; // �Ƿ���� \r\n
	char chIndent; // �����õ��ַ�
	int nChPerInd; // ÿ������ʹ�ü����ַ�
	bool bNLBracket; // { ֮ǰ�Ƿ���
	bool bKeepTopComt; // �Ƿ���ͷ����ע��
	bool bIndentInEmpty; // �Ƿ��������е�����
	bool bDisableVersionCheck; // �Ƿ�ر��Զ��汾���
};

const string keyPutCR("Put CR");
const string keyChIndent("Indent char");
const string keyChPerInd("Chars per indent");
const string keyNLBracket("New line before {");
const string keyKeepTopComt("Kepp top comment");
const string keyIndentInEmpty("Indent in empty");
const string keyDisableVersionCheck("Disable version check");

tstring GetConfigFilePath(HWND nppHandle);

void LoadOption(HWND nppHandle, StruOptions& struOptions);
void LoadDefaultOption(StruOptions& struOptions);

void SaveOption(HWND nppHandle, StruOptions struOptions);

void CopyText(LPCTSTR lpcText);

float GetDesktopScale(HWND hWnd);

#endif
