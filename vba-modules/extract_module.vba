Sub test()
    'HeroName = "jochen Linkohr"
    'HLastName = Split(HeroName, " ")(1)

    Dim olApp As Outlook.Application
    Dim olNS As Outlook.NameSpace
    Dim olAL As Outlook.AddressList
    Dim olEntry As Outlook.AddressEntry
    Dim olMember As Outlook.AddressEntry
    Dim lMemberCount As Long
    Dim objMail As Outlook.MailItem

    Dim xName As String
    Dim xPath, xFileName As String
    'Set xShell = CreateObject("Shell.Application")
        'Set xFolder = xShell.BrowseForFolder(0, "Select a folder:", 0, strStartingFolder)
        'If Not TypeName(xFolder) = "Nothing" Then
        'Set xFolderItem = xFolder.self
        'xFileName = xFolderItem.Path & "\"
        'Else
        'xFileName = ""
        'Exit Sub
        'End If

    Set olApp = Outlook.Application
    Set olNS = olApp.GetNamespace("MAPI")
    Set olAL = olNS.AddressLists("Test for Export")
    Set objMail = olApp.CreateItem(olMailItem)
    ' enter the list name
    Set olEntry = olAL.AddressEntries("test")
    ' get count of dist list members
    lMemberCount = olEntry.Members.Count
    ' loop through dist list and extract members

    Dim body As String
    Set dictEmployee = CreateObject("Scripting.Dictionary")
    Set dictSubValues = CreateObject("Scripting.Dictionary")
    Set dictBody = CreateObject("Scripting.Dictionary")
    dictBody.Add "Date", Date & " " & Time
    Dim i As Long
    For i = 1 To lMemberCount
        'MsgBox (olEntry.Members.Item(i))
        Set olMember = olEntry.Members.Item(i)
        dictSubValues.Add "LastName", (Split(olMember.Name, ",")(0))
        dictSubValues.Add "FirstName", (Split(Split(olMember.Name, ",")(1), " ")(1))
        dictEmployee.Add olMember.GetExchangeUser.Alias, dictSubValues
        Set dictSubValues = CreateObject("Scripting.Dictionary")
        Dim returnValue As StdPicture
        Set pic = olMember.GetExchangeUser.GetPicture
        stdole.SavePicture pic, "C:\temp\" + olMember.Name + ".jpg"
    Next i
    dictBody.Add "employees", dictEmployee
    body = ToJson(dictBody)
    'Debug.Print (body)
    myFile = "C:\temp\employees.json"
    Open myFile For Output As #1
        Write #1, body
    Close #1

End Sub


Function ToJson(ByVal dict As Object) As String
    Dim key As Variant, result As String, value As String

    result = "{"
    For Each key In dict.Keys
        result = result & IIf(Len(result) > 1, ",", "")

        If TypeName(dict(key)) = "Dictionary" Then
            value = ToJson(dict(key))
            ToJson = value
        Else
            value = """" & dict(key) & """"
        End If

        result = result & """" & key & """:" & value & ""
    Next key
    result = result & "}"

    ToJson = result
End Function
