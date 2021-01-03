# ec-app
react-redux/firebase


# reducresファイルへのdefaultデータ（初期値）は、スプレッドを使わない。
*ex)* 
*const a = { name:"Hello" };*  
*const b = { ...a };*  
*a !== b*  
**別のデータになるので、stateを更新後にも再度default値になってしまうため。**
