import {useSelector, useDispatch} from 'react-redux';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon, {Icons} from '../src/components/Icons';
import {saveGoals} from '../redux/todos';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;
const Tasbeeh = ({route}) => {
  const goalProgress = route.params?.goalProgress;
  const goalTarget = route.params?.goalTarget;
  const dispatch = useDispatch();
  const goals = useSelector(state => state.todos);

  const handleSaveProgress = async () => {
    const newProgress = progress + 1;
    setProgress(newProgress);
    if (goalTarget) {
      const goalIndex = goals.findIndex(e => e.type === 'tasbeeh');
      const updatedGoals = [...goals];
      updatedGoals[goalIndex] = {
        ...updatedGoals[goalIndex],
        progress: newProgress,
      };
      dispatch(
        saveGoals({
          goals: updatedGoals,
        }),
      );
      await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
    }
  };

  const handlePrevProgress = () => {
    if (goalTarget) {
      setProgress(prev => parseInt(goalProgress));
      setTarget(prev => parseInt(goalTarget));
    }
  };

  const [target, setTarget] = useState(0);
  const [progress, setProgress] = useState(0);
  const [enteredText, setEnteredText] = useState('');
  const Component = target === 0 || progress >= target ? View : Pressable;

  useEffect(() => {
    handlePrevProgress();
  }, []);

  return (
    <Component
      android_ripple={{color: 'rgba(10, 91, 85, 0.1)'}}
      onPress={() => {
        handleSaveProgress();
      }}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
        }}
        style={{
          width: '100%',
        }}>
        {progress < target || (progress === 0 && target === 0) ? (
          <View
            style={{
              alignItems: 'center',
            }}>
            <CircularProgress
              activeStrokeWidth={20}
              inActiveStrokeWidth={15}
              fontSize={55}
              radius={width * 0.4}
              duration={250}
              maxValue={target}
              value={progress}
              activeStrokeColor="#11998e"
              activeStrokeSecondaryColor="#0a5b55"
              inActiveStrokeColor={'#2ecc71'}
              inActiveStrokeOpacity={0.2}
            />
            <Text style={styles.completeText}>سبحان الله وبحمده</Text>
            <Text style={styles.completeText}>سبحان الله العظيم</Text>
          </View>
        ) : null}

        {target === 0 ? (
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType="number-pad"
              contextMenuHidden={true}
              value={enteredText}
              onChangeText={enteredText => setEnteredText(enteredText)}
              placeholder="ادخل عدد التسابيح "
              textAlign="right"
              style={styles.input}
            />
            <Pressable
              onPress={() => {
                if (
                  enteredText.trim().length === 0 ||
                  enteredText.includes(',') ||
                  enteredText.includes('-') ||
                  enteredText.includes('.')
                ) {
                  return;
                }
                setTarget(prev => parseInt(enteredText.trim()));
              }}
              android_ripple={{color: '#F0FFF0'}}
              style={styles.btn}>
              <Text style={styles.text}>ابدأ</Text>
            </Pressable>
          </View>
        ) : null}
        {progress >= target && target != 0 && (
          <View style={styles.finishTaskContainer}>
            <Icon
              color="#0a5b55"
              type={Icons.MaterialIcons}
              name="done"
              size={width * 0.5}
            />
            <Text style={styles.completeText}>
              تهانينا! لقد قمت بتحقيق هدفك بنجاح لا تنسي ان تحقق هدف أكبر في
              المرة القادمة
            </Text>
          </View>
        )}
      </ScrollView>
    </Component>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width * 0.6,
    borderBottomWidth: 3,
    borderBottomColor: '#0a5b55',
    backgroundColor: 'rgba(10, 91, 85, 0.1)',
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#11998e',
  },
  btn: {
    width: 80,
    height: 45,
    backgroundColor: '#0a5b55',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  text: {
    color: '#dce8dc',
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
  },
  finishTaskContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  completeText: {
    fontSize: 22,
    color: '#0a5b55',
    textAlign: 'center',
    fontFamily: 'Tajawal-Bold',
    lineHeight: 40,
    marginHorizontal: 5,
  },
});
export default Tasbeeh;
